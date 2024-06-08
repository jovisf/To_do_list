import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ListaMembros: React.FC = () => {
  const [membros, setMembros] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
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

  const handleEditar = (id: string) => {
    navigate(`/cadastro-membros/${id}`);
  };

  const handleRemover = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/membros/${id}`);
      fetchMembros();
      console.log("Membro removido com ID:", id);
    } catch (error) {
      console.error("Erro ao remover membro:", error);
    }
  };

  return (
    <Box
      id="container-lista-membros"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
        width: "100%",
        mt: "2rem",
      }}
    >
      <Typography variant="h4" sx={{ mb: "1rem" }}>
        Lista de Membros
      </Typography>
      <Box
        sx={{
          width: "50%",
          backgroundColor: "#e5e8ed",
          p: "1rem",
          borderRadius: "8px",
        }}
      >
        {membros.map((membro) => (
          <Box
            key={membro.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #ccc",
              py: "0.5rem",
            }}
          >
            <Typography>{membro.nome}</Typography>
            <Typography>{membro.email}</Typography>
            <Box>
              <Button
                variant="outlined"
                color="primary"
                sx={{ mr: 1 }}
                onClick={() => handleEditar(membro.id)}
              >
                Editar
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleRemover(membro.id)}
              >
                Remover
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ListaMembros;
