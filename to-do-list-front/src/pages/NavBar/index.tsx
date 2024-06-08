import React from 'react'
import { NavbarContainer, NavbarItems, Logo } from './styles'
import Logos from '../../assets'
import { Link } from 'react-router-dom'

export const NavBar: React.FC = () => {
  return (
    <NavbarContainer>
      <Logo>
        <img src={Logos.UFPE} alt="Logo" />
      </Logo>
      <NavbarItems>
        <ul>
            <li className='Options'> <Link to="/">Tarefas</Link></li>
            <li className='Options'> <Link to="/membros">Membros</Link></li>
            <li className='Options'> <Link to="/cadastro-membros">Cadastro de Membros</Link></li>
            <li className='Options'> <Link to="/cadastro-tarefa">Cadastro de tarefas</Link></li>
        </ul>
      </NavbarItems>
    </NavbarContainer>
  )
}
