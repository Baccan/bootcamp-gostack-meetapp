import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { format, isBefore, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { utcToZonedTime } from 'date-fns-tz';

import { Container, Header, Content } from './styles';

import api from '~/services/api';
import history from '~/services/history';

export default function Details({ match }) {
  const meetupId = decodeURIComponent(match.params.id);
  const profile = useSelector(state => state.user.profile);

  const [detail, setDetail] = useState({});

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

      setDetail({ ...response.data, time, past, url });
    }

    loadMeetup();
  }, [meetupId]);

  async function handleDelete(id) {
    await api.post(`/meetups/${id}`);
    history.push('/dashoard');
  }

  return (
    <Container>
      <Header>
        <h1>{detail.title}</h1>
        <div>
          {detail.user_id === profile.id && !detail.past ? (
            <Link to={`/meetups/edit/${detail.id}`}>
              <button type="button" id="btn-editar">
                Editar
              </button>
            </Link>
          ) : (
            <></>
          )}

          <Link to="/dashboard">
            <button type="button">Voltar</button>
          </Link>
        </div>
      </Header>
      <Content>
        <img src={detail.url} alt={detail.title} />
        <p>{detail.description}</p>
        <div>
          <span>{detail.time}</span>
          <span>{detail.location}</span>
          {detail.user_id === profile.id && !detail.past ? (
            <button
              type="button"
              id="btn-editar"
              onClick={() => handleDelete(detail.id)}
            >
              Deletar evento
            </button>
          ) : (
            <></>
          )}
        </div>
      </Content>
    </Container>
  );
}
