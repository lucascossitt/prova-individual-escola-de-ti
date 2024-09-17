require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')

const cursoRouter = require('./routers/curso.router')
const disciplinaRouter = require('./routers/disciplina.router')

const port = process.env.PORT || 8080
const app = express()
app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/curso', cursoRouter)
app.use('/disciplina', disciplinaRouter)

app.get('/', async function (req, res) {
    res.status(200).send('Online')
})

app.listen(port, () => console.log(`Iniciado na porta ${port}`))