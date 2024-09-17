const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = class DisciplinaService {
    static async getDisciplinas() {
        return prisma.disciplina.findMany()
    }

    static async addDisciplina(disciplina) {
        return prisma.disciplina.create({
            data: {...disciplina}
        })
    }

    static async removeDisciplina(idDisciplina) {
        return prisma.disciplina.delete({
            where: {id: idDisciplina}
        })
    }

    static updateDisciplina(disciplina) {
        return prisma.disciplina.update({
            where: {id: disciplina.id},
            data: {
                nome: disciplina.nome
            }
        })
    }
}