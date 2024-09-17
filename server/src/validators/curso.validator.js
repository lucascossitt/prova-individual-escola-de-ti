const yup = require('yup')

export const cursoValidator = yup.object({
    nome: yup.string().required().trim(),
    cargaHoraria: yup.number().required().positive().integer(),
    dataInicio: yup.date().required()
}).required()