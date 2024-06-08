import React, { useEffect, useState  } from "react"
import { Box, Typography, Button } from '@mui/material';
import TextFields from '../../components/TextFields';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, redirect, useNavigate } from 'react-router-dom';


export const CadastroMembro: React.FC = () => {
    
    interface Task {
        nome: string;
        email: string;
    }

    const { id } = useParams();
    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    const schema = yup.object({
        nome: yup.string().required('Nome é um campo obrigatório').min(5, 'Nome deve ter no mínimo 5 caracteres'),
        email: yup.string().required('Email é um campo obrigatório')
    });

    const { handleSubmit, formState: { errors}, control, setValue } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        axios.get(`http://localhost:3000/membros/${id}`)
            .then(response => {
                setTask(response.data);
                setValue('email', response.data.email);
                setValue('nome', response.data.nome);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar Membro:', error.message);
                setLoading(false);
            });
    }, [id, setValue]);

    const onSubmit = (data: any) => {
        axios.post('http://localhost:3000/membros', { membro: data })
        .then(response => {
            console.log('Resposta da API:', response.data);
            toast.success('Membro cadastrado com sucesso!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate('/membros');
        })
        .catch(error => {
            console.error('Erro ao fazer a requisição:', error.message);  
            toast.error('Não foi possível cadastrar o membro', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        });
    };

    return (
        <Box 
            id="container-acao" 
            sx={{
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                backgroundColor:'white',
                width:'100%',
                mb:'2rem',
        }}
        >
            <Box component={'form'} onSubmit={handleSubmit(onSubmit)} 
                sx={{borderRadius: '25px', 
                width:'50%',
                mt:'2rem',
                backgroundColor:'#e5e8ed',
                padding:'2rem', 
                display:'flex',
                justifyContent:'center',
                flexDirection:'column',
                alignItems:'center',
                '@media screen and (max-width: 768px)': {
                    width: '70%', 
                    flexDirection: 'column',  
            }}}
                >
                <h2>Cadastrar Membro</h2>
                <TextFields errors={errors} control={control}  name='nome' label='Nome'></TextFields>
                <TextFields errors={errors} control={control}  name='email' label='Email'></TextFields>
                <Button type="submit" variant="contained" sx={{color:'currentColor',  width: '80%', border: '1px solid rgba(0, 0, 0, 0.5)'}}>Enviar</Button>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </Box>            
        </Box>        
    )
};
