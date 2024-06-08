import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Tarefa {
    id: number;
    membro_id: number;
    nome: string;
    descricao: string;
    finalizada: boolean;
    prioridade: string;
}

interface Membro {
    id: number;
    nome: string;
}

const ListaTarefas: React.FC = () => {
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    const [membros, setMembros] = useState<Membro[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTarefas();
        fetchMembros();
    }, []);

    
    const fetchMembros = async () => {
        try {
            const response = await axios.get("http://localhost:3000/membros");
            setMembros(response.data);
        } catch (error) {
            console.error("Erro ao buscar membros:", error);
        }
    };
    
      const fetchTarefas = async () => {
        try {
          const response = await axios.get("http://localhost:3000/tarefas");
          setTarefas(response.data);
        } catch (error) {
          console.error("Erro ao buscar tarefas:", error);
        }
      };

    const getMembroNome = (membro_id: number) => {
        const membro = membros.find(membro => membro.id === membro_id);
        return membro ? membro.nome : 'Desconhecido';
    };

    const handleEditar = (tarefa_id: number) => {
        navigate(`/cadastro-tarefa/${tarefa_id}`);
    };

    const handleRemover = async (tarefa_id: number) => {
        try {
            await axios.delete(`http://localhost:3000/tarefas/${tarefa_id}`);
            fetchTarefas();
            fetchMembros();
            console.log("Tarefa removido com ID:", tarefa_id);
          } catch (error) {
            console.error("Erro ao remover tarefa:", error);
          }
    };

    const handleVizualizar = async (tarefa_id: number) =>{
        try {
            navigate(`/detalhes/${tarefa_id}`);
        } catch (error) {
            console.error("Erro ao visualizar: ", error);
        }
    }

    return (
        <Box 
            id="container-lista-tarefas" 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'black',
                width: '100%',
                pb: '2rem',
            }}
        >
            <h2 style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'nowrap',
                    color: 'white'
                }}>Lista de Tarefas</h2>
            <TableContainer component={Paper} sx={{ width: '80%', mt: '2rem' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Proprietário</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Nome</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Prioridade</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Finalizada</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tarefas.map((tarefa) => (
                            <TableRow key={tarefa.id}>
                                <TableCell>{getMembroNome(tarefa.membro_id)}</TableCell>
                                <TableCell>{tarefa.nome}</TableCell>
                                <TableCell>{tarefa.prioridade}</TableCell>
                                <TableCell>{tarefa.finalizada ? 'Sim' : 'Não'}</TableCell>
                                <TableCell> 
                                    <Box>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            sx={{ mr: 1 }}
                                            onClick={() => handleVizualizar(tarefa.id)}
                                        >
                                            Visualizar Detalhes
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            sx={{ mr: 1 }}
                                            onClick={() => handleEditar(tarefa.id)}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleRemover(tarefa.id)}
                                        >
                                            Remover
                                        </Button>
                                        
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ListaTarefas;
