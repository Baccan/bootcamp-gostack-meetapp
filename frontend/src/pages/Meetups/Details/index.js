import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Header, Content } from './styles';

export default function Details() {
  return (
    <Container>
      <Header>
        <h1>Meetup - React</h1>
        <div>
          <Link to="/meetups/edit">
            <button type="button" id="btn-editar">
              Editar
            </button>
          </Link>
          <Link to="/dashboard">
            <button type="button">Cancelar</button>
          </Link>
        </div>
      </Header>
      <Content>
        <img
          src="https://blog.gs1br.org/wp-content/uploads/2017/08/116182-workshop-palestra-curso-simposio-seminario-congresso-qual-a-diferenca.jpg"
          alt=""
        />
        <p>
          O Meetup de React Native é um evento que reúne a comunidade de
          desenvolvimento mobile utilizando React a fim de compartilhar
          conhecimento. Todos são convidados.
        </p>
        <p>
          <br />
          Caso queira participar como palestrante do meetup envie um e-mail para
          organizacao@meetuprn.com.br.
        </p>
        <div>
          <span>25 de Agosto às 18h30</span>
          <span>Rua Guilherme Gembala, 260</span>
        </div>
      </Content>
    </Container>
  );
}
