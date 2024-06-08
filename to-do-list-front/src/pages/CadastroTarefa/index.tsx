import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, CircularProgress } from '@mui/material';
import TextFields from '../../components/TextFields';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const schema = yup.object({
    membro_id: yup.number(),
    nome: yup.string().required('Nome da tarefa é obrigatório'),
    descricao: yup.string().required('Descrição da tarefa é obrigatória'),
    finalizada: yup.boolean().required('Estado de finalização é obrigatório'),
    prioridade: yup.string().required('Prioridade da tarefa é obrigatória')
});

export const CadastroTarefa: React.FC = () => {

    interface Task {
        membro_id: number;
        nome: string;
        descricao: string;
        finalizada: boolean;
        prioridade: string;
    }

    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [task, setTask] = useState<Task | null>(null);

    const { handleSubmit, formState: { errors }, control, setValue } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3000/tarefas/${id}`)
                .then(response => {
                    setTask(response.data);
                    setValue('membro_id', response.data.membro_id);
                    setValue('nome', response.data.nome);
                    setValue('descricao', response.data.descricao);
                    setValue('finalizada', response.data.finalizada);
                    setValue('prioridade', response.data.prioridade);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Erro ao buscar a tarefa:', error.message);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [id, setValue]);

    const onSubmit = (data: any) => {
        const requestData = {
            tarefa: {
                ...data
            }
        };
        if (id) {
            axios.put(`http://localhost:3000/tarefas/${id}`, requestData)
                .then(response => {
                    toast.success('Tarefa atualizada com sucesso!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    navigate('/');
                })
                .catch(error => {
                    console.error('Erro ao atualizar a tarefa:', error.message);
                });
        } else {
            axios.post(`http://localhost:3000/tarefas/`, requestData)
                .then(response => {
                    toast.success('Tarefa criada com sucesso!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    navigate('/');
                })
                .catch(error => {
                    console.error('Erro ao criar a tarefa:', error.message);
                });
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box 
            id="container-edicao-tarefa" 
            sx={{
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                backgroundColor:'black',
                width:'100%',
                pb:'2rem',
            }}
        >
            <h2 style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'nowrap',
                    color:'white'
                }}>Edição de Tarefa</h2>
            <Box component={'form'} onSubmit={handleSubmit(onSubmit)} sx={{borderRadius: '25px', width:'50%', mt:'2rem', backgroundColor:'#e5e8ed', padding:'2rem', display:'flex',justifyContent:'center', flexDirection:'column', alignItems:'center', '@media screen and (max-width: 900px)': {
                    width: '70%',
                    flexDirection: 'column',  
                    mt:0
            }}}>
                <TextFields errors={errors} control={control}  name='nome' label='Nome da Tarefa'></TextFields>
                <TextFields errors={errors} control={control}  name='descricao' label='Descrição da Tarefa'></TextFields>
                <TextFields errors={errors} control={control}  name='membro_id' label='Id do membro'></TextFields>
                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel id="finalizada-label">Finalizada</InputLabel>
                    <Select
                        label="Finalizada"
                        id="finalizada"
                        defaultValue={task?.finalizada ? "true" : "false"}
                        {...control.register('finalizada')}
                    >
                        <MenuItem value={"true"}>Verdadeiro</MenuItem>
                        <MenuItem value={"false"}>Falso</MenuItem>
                    </Select>
                </FormControl>
                <TextFields errors={errors} control={control}  name='prioridade' label='Prioridade da Tarefa'></TextFields>
                <Button type="submit" variant="contained" sx={{color:'currentColor',  width: '80%', border: '1px solid rgba(0, 0, 0, 0.5)'}}>Salvar Alterações</Button>
            </Box>
        </Box>       
    );
};
