import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import logo from '~/assets/images/logo.svg';

export default function SignIn() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <img src={logo} alt="Meetapp" />

      <Form onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Seu e-mail cadastrado" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />

        <button type="submit">Entrar</button>
        <Link to="/signup">Criar conta grátis</Link>
      </Form>
    </>
  );
}
