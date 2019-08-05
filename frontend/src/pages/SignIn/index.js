import React from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/images/logo.svg';

// import { Container } from './styles';

export default function SignIn() {
  return (
    <>
      <img src={logo} alt="Meetapp" />

      <form>
        <input type="email" placeholder="Seu e-mail cadastrado" />
        <input type="password" placeholder="Sua senha secreta" />

        <button type="submit">Entrar</button>
        <Link to="/signup">Criar conta grátis</Link>
      </form>
    </>
  );
}
