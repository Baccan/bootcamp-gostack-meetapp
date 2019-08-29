import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { format, isBefore, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { utcToZonedTime } from 'date-fns-tz';

import { MdDeleteForever, MdEdit, MdLocationOn, MdEvent } from 'react-icons/md';
import { Container, Header, Content } from './styles';

import api from '~/services/api';

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

  return (
    <Container>
      <Header>
        <h1>Meetup - React</h1>
        <div>
          {detail.user_id === profile.id ? (
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
        </div>
      </Content>
    </Container>
  );
}
