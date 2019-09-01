import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Form, Input } from '@rocketseat/unform';
import { MdCancel, MdCheckCircle } from 'react-icons/md';

import { format, isBefore, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { utcToZonedTime } from 'date-fns-tz';

import * as Yup from 'yup';

import history from '~/services/history';

import { updateMeetupRequest } from '~/store/modules/meetup/actions';

import MeetupImageInput from '~/components/MeetupImageInput';

import DatePicker from '~/components/DatePicker';

import { Container } from './styles';

import api from '~/services/api';

export default function Edit({ match }) {
  const dispatch = useDispatch();
  const [meetup, setMeetup] = useState({});
  const [description, setDescription] = useState({});
  const [date, setDate] = useState(new Date());

  const meetupId = decodeURIComponent(match.params.id);

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

      setDescription(response.data.description);
      setDate(parseISO(response.data.date_hour));
      setMeetup({ ...response.data, time, past, url });
    }

    loadMeetup();
  }, [meetupId]);

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

  async function handleSubmit(data) {
    dispatch(updateMeetupRequest(data, meetupId));

    history.push(`/meetups/details/${meetupId}`);
  }

  return (
    <Container>
      <header>
        <h1>Editar Meetup</h1>
        <Link to={`/meetups/details/${meetupId}`}>
          <button type="button">
            <MdCancel size={16} color="#fff" />
            Cancelar
          </button>
        </Link>
      </header>

      <Form schema={schema} initialData={meetup} onSubmit={handleSubmit}>
        <MeetupImageInput
          name="file_id"
          image={meetup.url}
          imageId={meetup.file_id}
        />
        <Input name="title" placeholder="Título do Meetup" />
        <Input
          multiline
          onChange={e => {
            setDescription(e.value);
          }}
          name="description"
          value={description}
          id="description"
          placeholder="Descrição completa"
        />
        <DatePicker name="date_hour" value={date} />
        {/* <Input name="date_hour" placeholder="Data do meetup" /> */}
        <Input name="location" placeholder="Localização" />
        <button type="submit">
          <MdCheckCircle size={16} color="#fff" />
          Salvar meetup
        </button>
      </Form>
    </Container>
  );
}
