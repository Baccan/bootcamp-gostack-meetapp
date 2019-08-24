import React from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/images/logo.svg';

import { Container, Content, Profile } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <Link to="/dashboard">
            <img src={logo} alt="Meetapp" />
          </Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>Gustavo Baccan</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
            <Link to="/profile">
              <img
                src="https://api.adorable.io/avatars/50/abott@adorable.png"
                alt="Gustavo Baccan"
              />
            </Link>
            <button type="button">Sair</button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
