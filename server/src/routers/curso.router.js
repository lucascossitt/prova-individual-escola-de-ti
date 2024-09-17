const express = require('express')
const CursoService = require('../services/curso.service')

const router = express.Router()

router.get('/', async function (req, res) {
    try {
        const cursos = await CursoService.getCursos()
        res.status(200).json(cursos)
    } catch (err) {
        console.error(err)
        res.status(500).send()
    }
})

router.post('/', async function (req, res) {
    try {
        const cursoInfo = req.body

        const curso = await CursoService.addCurso(cursoInfo)
        res.status(200).json(curso)
    } catch (err) {
        console.error(err)
        res.status(500).send()
    }
})

router.put('/', async function (req, res) {
    try {
        const cursoInfo = req.body

        const curso = await CursoService.updateCurso(cursoInfo)
        res.status(200).json(curso)
    } catch (err) {
        console.error(err)
        res.status(500).send()
    }
})

router.delete('/', async function (req, res) {
    try {
        const idCurso = req.body.id

        const curso = await CursoService.removeCurso(idCurso)
        res.status(200).json(curso)
    } catch (err) {
        console.error(err)
        res.status(500).send()
    }
})

router.put('/vincular-disciplina', async function (req, res) {
    try {
        const idCurso = req.body.idCurso
        const idDisciplina = req.body.idDisciplina

        const curso = await CursoService.addDisciplinaToCurso(idCurso, idDisciplina)
        res.status(200).json(curso)
    } catch (err) {
        console.error(err)
        res.status(500).send()
    }
})

router.put('/desvincular-disciplina', async function (req, res) {
    try {
        const idCurso = req.body.idCurso
        const idDisciplina = req.body.idDisciplina

        const curso = await CursoService.removeDisciplinaFromCurso(idCurso, idDisciplina)
        res.status(200).json(curso)
    } catch (err) {
        console.error(err)
        res.status(500).send()
    }
})

module.exports = router