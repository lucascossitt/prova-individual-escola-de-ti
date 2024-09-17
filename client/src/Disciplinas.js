import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Disciplinas = () => {
    const [disciplinas, setDisciplinas] = useState([])
    const [editandoDisciplinaId, setEditandoDisciplinaId] = useState(null)
    const [nome, setNome] = useState('')
    const [novoNome, setNovoNome] = useState('')
    const [mostrarFormularioCriacao, setMostrarFormularioCriacao] = useState(false)

    const fetchDisciplinas = async () => {
        try {
            const response = await axios.get('http://localhost:8080/disciplina')
            setDisciplinas(response.data)
        } catch (error) {
            console.error('Erro ao buscar disciplinas:', error)
            alert('Erro ao buscar disciplinas.')
        }
    }

    useEffect(() => {
        fetchDisciplinas()
    }, [])

    const refreshPage = () => {
        window.location.reload(false)
    }

    const deletarDisciplina = async (idDisciplina) => {
        try {
            const confirma = window.confirm('Tem certeza que deseja deletar a disciplina?')
            if (confirma) {
                await axios.delete('http://localhost:8080/disciplina', {data: {id: idDisciplina}})
                refreshPage()
            }
        } catch (error) {
            console.error('Erro ao deletar disciplina:', error)
            alert('Erro ao deletar disciplina.')
        }
    }

    const iniciarEdicaoDisciplina = (disciplina) => {
        setEditandoDisciplinaId(disciplina.id)
        setNome(disciplina.nome)
    }

    const atualizarDisciplina = async () => {
        try {
            await axios.put('http://localhost:8080/disciplina', {
                id: editandoDisciplinaId,
                nome,
            })
            setEditandoDisciplinaId(null)
            refreshPage()
        } catch (error) {
            console.error('Erro ao atualizar disciplina:', error)
            alert('Erro ao atualizar disciplina.')
        }
    }

    const criarDisciplina = async () => {
        // Validação
        if (!novoNome) {
            alert('Por favor, preencha o nome da disciplina.')
            return
        }
        try {
            await axios.post('http://localhost:8080/disciplina', {nome: novoNome})
            setNovoNome('')
            setMostrarFormularioCriacao(false)
            refreshPage()
        } catch (error) {
            console.error('Erro ao criar disciplina:', error)
            alert('Erro ao criar disciplina.')
        }
    }

    return (
        <div style={{padding: '20px', maxWidth: '400px'}}>
            <h1 style={{textAlign: 'center'}}>Disciplinas</h1>
            <div style={{textAlign: 'center', marginBottom: '20px'}}>
                <button onClick={() => setMostrarFormularioCriacao(!mostrarFormularioCriacao)}>
                    {mostrarFormularioCriacao ? 'Cancelar' : 'Criar Nova Disciplina'}
                </button>
            </div>

            {mostrarFormularioCriacao && (
                <div style={{marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px'}}>
                    <h2>Criar Nova Disciplina</h2>
                    <input
                        type="text"
                        placeholder="Nome da Disciplina"
                        value={novoNome}
                        onChange={(e) => setNovoNome(e.target.value)}
                        style={{marginRight: '10px'}}
                    />
                    <button
                        onClick={criarDisciplina}
                        disabled={!novoNome}
                    >
                        Criar Disciplina
                    </button>
                </div>
            )}

            <ul style={{listStyle: 'none', padding: 0}}>
                {disciplinas.map((disciplina) => (
                    <li key={disciplina.id}
                        style={{marginBottom: '20px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px'}}>
                        {editandoDisciplinaId === disciplina.id ? (
                            <div>
                                <h2>Editar Disciplina</h2>
                                <input
                                    type="text"
                                    placeholder="Nome da Disciplina"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    style={{marginRight: '10px'}}
                                />
                                <button onClick={atualizarDisciplina}>Salvar Alterações</button>
                                <button onClick={() => setEditandoDisciplinaId(null)}
                                        style={{marginLeft: '10px'}}>Cancelar
                                </button>
                            </div>
                        ) : (
                            <>
                                <span>{disciplina.nome}</span>
                                <div>
                                    <button onClick={() => iniciarEdicaoDisciplina(disciplina)}
                                            style={{marginRight: '10px'}}>
                                        Editar Disciplina
                                    </button>
                                    <button onClick={() => deletarDisciplina(disciplina.id)}>Deletar Disciplina</button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Disciplinas