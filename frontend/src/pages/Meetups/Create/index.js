import React from 'react';
import { Form, Input } from '@rocketseat/unform';
// import * as Yup from 'yup';

import history from '~/services/history';
import api from '~/services/api';

import { Container } from './styles';

import MeetupImageInput from '~/components/MeetupImageInput';

export default function Create() {
  // const schema = Yup.object().shape({});

  async function handleSubmit(data) {
    const response = await api.post('meetups', data);

    console.tron.log(response);

    history.push('/dashboard');
  }

  return (
    <Container>
      <h1>Editar Meetup</h1>

      <Form onSubmit={handleSubmit}>
        <MeetupImageInput name="file_id" />
        <Input name="title" placeholder="Título do Meetup" />
        <Input
          multiline
          name="description"
          id="description"
          placeholder="Descrição completa"
        />
        <Input name="date_hour" placeholder="Data do meetup" />
        <Input name="location" placeholder="Localização" />
        <button type="submit">
          {/* <MdAddCircle size={22} color="#fff" /> */}
          Criar meetup
        </button>
      </Form>
    </Container>
  );
}
