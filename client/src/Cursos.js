import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Cursos = () => {
    const [cursos, setCursos] = useState([])
    const [disciplinas, setDisciplinas] = useState([])
    const [selectedDisciplina, setSelectedDisciplina] = useState({})
    const [editandoCurso, setEditandoCurso] = useState(null)
    const [nome, setNome] = useState('')
    const [cargaHoraria, setCargaHoraria] = useState('')
    const [dataInicio, setDataInicio] = useState('')
    const [novoNome, setNovoNome] = useState('')
    const [novaCargaHoraria, setNovaCargaHoraria] = useState('')
    const [novaDataInicio, setNovaDataInicio] = useState('')
    const [mostrarFormularioCriacao, setMostrarFormularioCriacao] = useState(false)

    const fetchCursosEDisciplinas = async () => {
        try {
            const cursosResponse = await axios.get('http://localhost:8080/curso')
            const disciplinasResponse = await axios.get('http://localhost:8080/disciplina')

            setCursos(cursosResponse.data)
            setDisciplinas(disciplinasResponse.data)
        } catch (error) {
            console.error('Erro ao buscar cursos e disciplinas:', error)
            alert('Erro ao buscar cursos e disciplinas.')
        }
    }

    useEffect(() => {
        fetchCursosEDisciplinas()
    }, [])

    const refreshPage = () => {
        window.location.reload(false)
    }

    const deletarCurso = async (idCurso) => {
        try {
            const confirma = window.confirm('Tem certeza que deseja deletar o curso?')
            if (confirma) {
                await axios.delete('http://localhost:8080/curso', {data: {id: idCurso}})
                refreshPage()
            }
        } catch (error) {
            console.error('Erro ao deletar curso:', error)
            alert('Erro ao deletar curso.')
        }
    }

    const iniciarEdicaoCurso = (curso) => {
        setEditandoCurso(curso.id)
        setNome(curso.nome)
        setCargaHoraria(curso.cargaHoraria)
        setDataInicio(new Date(curso.dataInicio).toISOString().split('T')[0])
    }

    const atualizarCurso = async () => {
        try {
            const dataISO = new Date(dataInicio).toISOString()
            await axios.put('http://localhost:8080/curso', {
                id: editandoCurso,
                nome,
                cargaHoraria,
                dataInicio: dataISO,
            })
            setEditandoCurso(null)
            refreshPage()
        } catch (error) {
            console.error('Erro ao atualizar curso:', error)
            alert('Erro ao atualizar curso.')
        }
    }

    const criarCurso = async () => {
        if (!novoNome || !novaCargaHoraria || !novaDataInicio) {
            alert('Por favor, preencha todos os campos.')
            return
        }
        try {
            const dataISO = new Date(novaDataInicio).toISOString()
            await axios.post('http://localhost:8080/curso', {
                nome: novoNome,
                cargaHoraria: novaCargaHoraria,
                dataInicio: dataISO,
            })
            setNovoNome('')
            setNovaCargaHoraria('')
            setNovaDataInicio('')
            setMostrarFormularioCriacao(false)
            refreshPage()
        } catch (error) {
            console.error('Erro ao criar curso:', error)
            alert('Erro ao criar curso.')
        }
    }

    const vincularDisciplina = async (cursoId) => {
        try {
            const disciplinaId = selectedDisciplina[cursoId]
            await axios.put('http://localhost:8080/curso/vincular-disciplina', {
                idCurso: cursoId,
                idDisciplina: disciplinaId,
            })
            refreshPage()
        } catch (error) {
            console.error('Erro ao vincular disciplina:', error)
            alert('Erro ao vincular disciplina.')
        }
    }

    const desvincularDisciplina = async (cursoId, disciplinaId) => {
        try {
            const confirma = window.confirm('Tem certeza que deseja desvincular a disciplina do curso?')
            if (confirma) {
                await axios.put('http://localhost:8080/curso/desvincular-disciplina', {
                    idCurso: cursoId,
                    idDisciplina: disciplinaId,
                })
                refreshPage()
            }
        } catch (error) {
            console.error('Erro ao desvincular disciplina:', error)
            alert('Erro ao desvincular disciplina.')
        }
    }

    const handleSelectDisciplina = (cursoId, disciplinaId) => {
        setSelectedDisciplina((prevState) => ({
            ...prevState,
            [cursoId]: disciplinaId,
        }))
    }

    return (
        <div style={{padding: '20px', maxWidth: '400px'}}>
            <h1 style={{textAlign: 'center'}}>Cursos</h1>
            <div style={{textAlign: 'center', marginBottom: '20px'}}>
                <button onClick={() => setMostrarFormularioCriacao(!mostrarFormularioCriacao)}>
                    {mostrarFormularioCriacao ? 'Cancelar' : 'Criar Novo Curso'}
                </button>
            </div>

            {mostrarFormularioCriacao && (
                <div style={{marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px'}}>
                    <h2>Criar Novo Curso</h2>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={novoNome}
                        onChange={(e) => setNovoNome(e.target.value)}
                        style={{marginRight: '10px'}}
                    />
                    <input
                        type="number"
                        placeholder="Carga Horária"
                        value={novaCargaHoraria}
                        onChange={(e) => setNovaCargaHoraria(e.target.value)}
                        style={{marginRight: '10px'}}
                    />
                    <input
                        type="date"
                        value={novaDataInicio}
                        onChange={(e) => setNovaDataInicio(e.target.value)}
                        style={{marginRight: '10px'}}
                    />
                    <button
                        onClick={criarCurso}
                        disabled={!novoNome || !novaCargaHoraria || !novaDataInicio}
                        style={{marginRight: '10px'}}
                    >
                        Criar Curso
                    </button>
                    <button onClick={() => setMostrarFormularioCriacao(false)}>Cancelar</button>
                </div>
            )}

            <ul style={{listStyle: 'none', padding: 0}}>
                {cursos.map((curso) => (
                    <li key={curso.id}
                        style={{marginBottom: '20px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px'}}>
                        {editandoCurso !== curso.id ? (
                            <>
                                <h3>{curso.nome} - {curso.cargaHoraria} horas</h3>
                                <p>Data de Início: {new Date(curso.dataInicio).toLocaleDateString()}</p>

                                <h4>Disciplinas Vinculadas:</h4>
                                {curso.disciplinas.length > 0 ? (
                                    <ul>
                                        {curso.disciplinas.map((disciplina) => (
                                            <li key={disciplina.id}>
                                                {disciplina.nome}
                                                <button
                                                    onClick={() => desvincularDisciplina(curso.id, disciplina.id)}
                                                    style={{marginLeft: '10px', color: 'red'}}
                                                >
                                                    Remover
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Nenhuma disciplina vinculada</p>
                                )}

                                <div style={{marginTop: '10px'}}>
                                    <label>Adicionar Disciplina:</label>
                                    <select
                                        onChange={(e) => handleSelectDisciplina(curso.id, e.target.value)}
                                        value={selectedDisciplina[curso.id] || ''}
                                        style={{marginLeft: '10px', marginRight: '10px'}}
                                    >
                                        <option value="">Selecione uma disciplina</option>
                                        {disciplinas.map((disciplina) => (
                                            <option key={disciplina.id} value={disciplina.id}>
                                                {disciplina.nome}
                                            </option>
                                        ))}
                                    </select>
                                    <button onClick={() => vincularDisciplina(curso.id)}
                                            disabled={!selectedDisciplina[curso.id]}>
                                        Vincular Disciplina
                                    </button>
                                </div>

                                <div style={{marginTop: '20px'}}>
                                    <button onClick={() => iniciarEdicaoCurso(curso)} style={{marginRight: '10px'}}>
                                        Editar Curso
                                    </button>
                                    <button onClick={() => deletarCurso(curso.id)}>Deletar Curso</button>
                                </div>
                            </>
                        ) : (
                            <div>
                                <h2>Editar Curso</h2>
                                <input
                                    type="text"
                                    placeholder="Nome"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    style={{marginRight: '10px'}}
                                />
                                <input
                                    type="number"
                                    placeholder="Carga Horária"
                                    value={cargaHoraria}
                                    onChange={(e) => setCargaHoraria(e.target.value)}
                                    style={{marginRight: '10px'}}
                                />
                                <input
                                    type="date"
                                    value={dataInicio}
                                    onChange={(e) => setDataInicio(e.target.value)}
                                    style={{marginRight: '10px'}}
                                />
                                <button onClick={atualizarCurso} style={{marginRight: '10px'}}>
                                    Salvar Alterações
                                </button>
                                <button onClick={() => setEditandoCurso(null)}>Cancelar</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Cursos