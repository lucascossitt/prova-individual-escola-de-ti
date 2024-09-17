const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = class CursoService {
    static getCursos() {
        return prisma.curso.findMany({
            include: {disciplinas: true}
        })
    }

    static getCurso(idCurso) {
        return prisma.curso.findFirst({
            where: {id: idCurso}
        })
    }

    static addCurso(curso) {
        return prisma.curso.create({
            data: {
                nome: curso.nome,
                cargaHoraria: curso.cargaHoraria,
                dataInicio: new Date(curso.dataInicio).toISOString()
            }
        })
    }

    static removeCurso(idCurso) {
        return prisma.curso.delete({
            where: {id: idCurso}
        })
    }

    static updateCurso(curso) {
        return prisma.curso.update({
            where: {id: curso.id},
            data: {
                nome: curso.nome,
                cargaHoraria: curso.cargaHoraria,
                dataInicio: new Date(curso.dataInicio).toISOString()
            }
        })
    }

    static addDisciplinaToCurso(idCurso, idDisciplina) {
        return prisma.curso.update({
            where: {id: idCurso},
            data: {
                disciplinas: {connect: {id: idDisciplina}}
            }
        })
    }

    static removeDisciplinaFromCurso(idCurso, idDisciplina) {
        return prisma.curso.update({
            where: {id: idCurso},
            data: {
                disciplinas: {disconnect: {id: idDisciplina}}
            }
        })
    }
}