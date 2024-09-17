const express = require('express')
const {z} = require('zod')
const CursoService = require('../services/curso.service')

const router = express.Router()
const criarCursoSchema = z.object({
    nome: z.string().max(255),
    cargaHoraria: z.number().int().nonnegative(),
    dataInicio: z.string().refine((val) => {
        return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(val);
    }, { message: "dataInicio must follow ISO 8601 format" })
})
const editarCursoSchema = z.object({
    id: z.number().int().nonnegative(),
    nome: z.string().max(255),
    cargaHoraria: z.number().int().nonnegative(),
    dataInicio: z.string().refine((val) => {
        return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(val);
    }, { message: "dataInicio must follow ISO 8601 format" })
})
const deletarCursoSchema = z.object({
    id: z.number().int().nonnegative()
})
const vincularDesvincularCursoDisciplinaSchema = z.object({
    idCurso: z.number().int().nonnegative(),
    idDisciplina: z.number().int().nonnegative()
})

const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body)
        next()
    } catch (err) {
        return res.status(400).json({ error: err.errors })
    }
}

router.get('/', async function (req, res) {
    try {
        const cursos = await CursoService.getCursos()
        res.status(200).json(cursos)
    } catch (err) {
        console.error(err)
        res.status(500).send()
    }
})

router.post('/', validate(criarCursoSchema), async function (req, res) {
    try {
        const cursoInfo = req.body

        const curso = await CursoService.addCurso(cursoInfo)
        res.status(200).json(curso)
    } catch (err) {
        console.error(err)
        res.status(500).send()
    }
})

router.put('/', validate(editarCursoSchema), async function (req, res) {
    try {
        const cursoInfo = req.body

        const curso = await CursoService.updateCurso(cursoInfo)
        res.status(200).json(curso)
    } catch (err) {
        console.error(err)
        res.status(500).send()
    }
})

router.delete('/', validate(deletarCursoSchema), async function (req, res) {
    try {
        const idCurso = req.body.id

        const curso = await CursoService.removeCurso(idCurso)
        res.status(200).json(curso)
    } catch (err) {
        console.error(err)
        res.status(500).send()
    }
})

router.put('/vincular-disciplina', validate(vincularDesvincularCursoDisciplinaSchema), async function (req, res) {
    try {
        const idCurso = parseInt(req.body.idCurso)
        const idDisciplina = parseInt(req.body.idDisciplina)

        const curso = await CursoService.addDisciplinaToCurso(idCurso, idDisciplina)
        res.status(200).json(curso)
    } catch (err) {
        console.error(err)
        res.status(500).send()
    }
})

router.put('/desvincular-disciplina', validate(vincularDesvincularCursoDisciplinaSchema), async function (req, res) {
    try {
        const idCurso = parseInt(req.body.idCurso)
        const idDisciplina = parseInt(req.body.idDisciplina)

        const curso = await CursoService.removeDisciplinaFromCurso(idCurso, idDisciplina)
        res.status(200).json(curso)
    } catch (err) {
        console.error(err)
        res.status(500).send()
    }
})

module.exports = router