import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
// import * as Yup from 'yup';

import { updateMeetupRequest } from '~/store/modules/meetup/actions';

import MeetupImageInput from '~/components/MeetupImageInput';
// import api from '~/services/api';

import { Container } from './styles';

export default function Edit({ match }) {
  const meetupId = decodeURIComponent(match.params.id);
  console.tron.log(meetupId);
  const dispatch = useDispatch();
  // const meetup = useSelector(state => state.meetup);

  // const schema = Yup.object().shape({});

  async function handleSubmit(data) {
    dispatch(updateMeetupRequest(data));
    console.tron.log(data);

    // const response = await api.post('meetups', data);

    // console.tron.log(response);

    // history.push('/dashboard');
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
          Salvar meetup
        </button>
      </Form>
    </Container>
  );
}
