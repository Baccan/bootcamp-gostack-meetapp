import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { MdCancel, MdCheckCircle } from 'react-icons/md';
import history from '~/services/history';
import api from '~/services/api';

import { Container } from './styles';

import MeetupImageInput from '~/components/MeetupImageInput';
import DatePicker from '~/components/DatePicker';

export default function Create() {
  async function handleSubmit(data) {
    const response = await api.post('meetups', data);

    const { id } = response.data;

    history.push(`/meetups/details/${id}`);
  }

  const schema = Yup.object().shape({
    title: Yup.string()
      .min(5, 'Deve ter no mínimo 5 caracteres')
      .required('Título obrigatório'),
    description: Yup.string()
      .min(15, 'Deve ter no mínimo 15 caracteres')
      .required('Descrição obrigatória'),
    location: Yup.string()
      .min(10, 'Deve ter no mínimo 10 caracteres')
      .required('Localização obrigatório'),
    date_hour: Yup.date('Selecione uma data válida').required(
      'Data obrigatória'
    ),
    file_id: Yup.number('Imagem obrigatória').required('Imagem obrigatória'),
  });

  return (
    <Container>
      <header>
        <h1>Criar Meetup</h1>
        <Link to="/dashboard">
          <button type="button">
            <MdCancel size={16} color="#fff" />
            Cancelar
          </button>
        </Link>
      </header>

      <Form schema={schema} onSubmit={handleSubmit}>
        <MeetupImageInput name="file_id" />
        <Input name="title" placeholder="Título do Meetup" />
        <Input
          multiline
          name="description"
          id="description"
          placeholder="Descrição completa"
        />
        {/* <DatePicker name="date_hour" /> */}
        <Input name="date_hour" placeholder="Data do meetup" />
        <Input name="location" placeholder="Localização" />
        <button type="submit">
          <MdCheckCircle size={16} color="#fff" />
          Criar meetup
        </button>
      </Form>
    </Container>
  );
}
