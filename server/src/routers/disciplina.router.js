const express = require('express')
const DisciplinaService = require('../services/disciplina.service')

const router = express.Router()

router.get('/', async function (req, res) {
    try {
        const disciplinas = await DisciplinaService.getDisciplinas()
        res.status(200).json(disciplinas)
    } catch (err) {
        console.error(err)
        res.status(500).send()
    }
})

router.post('/', async function (req, res) {
    try {
        const disciplinaInfo = req.body

        const disciplina = await DisciplinaService.addDisciplina(disciplinaInfo)
        res.status(200).json(disciplina)
    } catch (err) {
        console.error(err)
        res.status(500).send()
    }
})

router.put('/', async function (req, res) {
    try {
        const disciplinaInfo = req.body

        const disciplina = await DisciplinaService.updateDisciplina(disciplinaInfo)
        res.status(200).json(disciplina)
    } catch (err) {
        console.error(err)
        res.status(500).send()
    }
})

router.delete('/', async function (req, res) {
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