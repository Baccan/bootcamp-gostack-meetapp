import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Input } from '@rocketseat/unform';

import { format, isBefore, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { utcToZonedTime } from 'date-fns-tz';

// import * as Yup from 'yup';

import {
  updateMeetupRequest,
  listMeetupRequest,
} from '~/store/modules/meetup/actions';

import MeetupImageInput from '~/components/MeetupImageInput';
// import api from '~/services/api';

import { Container } from './styles';

import api from '~/services/api';

export default function Edit({ match }) {
  const dispatch = useDispatch();
  const [meetup, setMeetup] = useState({});

  const meetupId = decodeURIComponent(match.params.id);

  // dispatch(listMeetupRequest(meetupId));
  // const meetup = useSelector(state => state.meetup);

  useEffect(() => {
    async function loadMeetup() {
      const response = await api.get(`/meetups/${meetupId}`);

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const formatIso = parseISO(response.data.date_hour);
      const compareDate = utcToZonedTime(formatIso, timezone);

      const time = format(formatIso, "dd 'de' MMMM', às 'HH'h'", {
        locale: pt,
      });

      const past = isBefore(compareDate, new Date());
      const { url } = response.data.image;

      setMeetup({ ...response.data, time, past, url });
    }

    loadMeetup();
  }, [meetupId]);

  // const schema = Yup.object().shape({});

  async function handleSubmit(data) {
    dispatch(updateMeetupRequest(data, meetupId));
  }

  return (
    <Container>
      <header>
        <h1>Editar Meetup</h1>
        <Link to={`/meetups/details/${meetupId}`}>
          <button type="button">Cancelar</button>
        </Link>
      </header>

      <Form initialData={meetup} onSubmit={handleSubmit}>
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
