import React from 'react';
import { Link } from 'react-router-dom';

import { Container, MeetupsList } from './styles';

export default function Dashboard() {
  return (
    <Container>
      <header>
        <h1>Meus meetups</h1>
        <Link to="/meetups/new">
          <button type="button">Novo meetap</button>
        </Link>
      </header>

      <MeetupsList>
        <li>
          Meetup - React
          <span>25 de Agosto, às 18h30</span>
        </li>
        <li>
          Meetup - React
          <span>25 de Agosto, às 18h30</span>
        </li>
        <li>
          Meetup - React
          <span>25 de Agosto, às 18h30</span>
        </li>
        <li>
          Meetup - React
          <span>25 de Agosto, às 18h30</span>
        </li>
      </MeetupsList>
    </Container>
  );
}
