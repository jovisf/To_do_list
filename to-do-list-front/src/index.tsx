// index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Footer } from './pages/footer';
import { NavBar } from './pages/NavBar';
import ListaMembros from './pages/Membros';
import ListaTarefas from './pages/Tarefas';
import { CadastroMembro } from './pages/CadastroMembro';
import { CadastroTarefa } from './pages/CadastroTarefa';
import DetalhesTarefa from './pages/DetalhesTarefa';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
      <div id="root">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<ListaTarefas />} />
            <Route path="/membros" element={<ListaMembros />} />
            <Route path="/cadastro-membros/:id?" element={<CadastroMembro />} />
            <Route path="/cadastro-tarefa/:id?" element={<CadastroTarefa />} />
            <Route path="/detalhes/:id" element={<DetalhesTarefa/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  </React.StrictMode>
);
