import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface TarefaDetalhe {
    id: number;
    created_at: string;
    updated_at: string;
    nome: string;
    descricao: string;
    finalizada: boolean;
    data_termino: string;
    prioridade: string;
    membro_id: number;
}

const DetalhesTarefa: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [tarefa, setTarefa] = useState<TarefaDetalhe | null>(null);

    useEffect(() => {
        fetchTarefa();
    }, [id]);

    const fetchTarefa = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/tarefas/${id}`);
            setTarefa(response.data);
        } catch (error) {
            console.error("Erro ao buscar detalhes da tarefa:", error);
        }
    };

    return (
        <Box 
            id="container-detalhes-tarefa" 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'black',
                width: '100%',
                pb: '2rem',
            }}
        >
            <Typography 
                variant="h4" 
                component="h2" 
                sx={{ 
                    color: 'white', 
                    mt: '2rem'
                }}
            >
                Detalhes da Tarefa
            </Typography>
            {tarefa && (
                <Paper sx={{ width: '80%', mt: '2rem', p: '2rem' }}>
                    <Typography variant="h6" component="h3">
                        Nome: {tarefa.nome}
                    </Typography>
                    <Typography variant="body1" component="p" sx={{ mt: '1rem' }}>
                        Descrição: {tarefa.descricao}
                    </Typography>
                    <Typography variant="body1" component="p" sx={{ mt: '1rem' }}>
                        Prioridade: {tarefa.prioridade}
                    </Typography>
                    <Typography variant="body1" component="p" sx={{ mt: '1rem' }}>
                        Data de Término: {new Date(tarefa.data_termino).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body1" component="p" sx={{ mt: '1rem' }}>
                        Finalizada: {tarefa.finalizada ? 'Sim' : 'Não'}
                    </Typography>
                </Paper>
            )}
        </Box>
    );
};

export default DetalhesTarefa;
