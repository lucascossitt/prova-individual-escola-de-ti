const express = require('express')
const {z} = require('zod')
const DisciplinaService = require('../services/disciplina.service')

const router = express.Router()
const criarDisciplinaSchema = z.object({
    id: z.number().int().nonnegative(),
    nome: z.string().max(255)
})
const editarDisciplinaSchema = z.object({
    id: z.number().int().nonnegative(),
    nome: z.string().max(255)
})
const deletarDisciplinaSchema = z.object({
    id: z.number().int().nonnegative()
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
        const disciplinas = await DisciplinaService.getDisciplinas()
        res.status(200).json(disciplinas)
    } catch (err) {
        console.error(err)
        res.status(500).send()
    }
})

router.post('/', validate(criarDisciplinaSchema), async function (req, res) {
    try {
        const disciplinaInfo = req.body

        const disciplina = await DisciplinaService.addDisciplina(disciplinaInfo)
        res.status(200).json(disciplina)
    } catch (err) {
        console.error(err)
        res.status(500).send()
    }
})

router.put('/', validate(editarDisciplinaSchema), async function (req, res) {
    try {
        const disciplinaInfo = req.body

        const disciplina = await DisciplinaService.updateDisciplina(disciplinaInfo)
        res.status(200).json(disciplina)
    } catch (err) {
        console.error(err)
        res.status(500).send()
    }
})

router.delete('/', validate(deletarDisciplinaSchema), async function (req, res) {
    try {
        const idDisciplina = req.body.id

        const disciplina = await DisciplinaService.removeDisciplina(idDisciplina)
        res.status(200).json(disciplina)
    } catch (err) {
        console.error(err)
        res.status(500).send()
    }
})

module.exports = router