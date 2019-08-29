import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { format, isBefore, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { utcToZonedTime } from 'date-fns-tz';

import {
  MdAddCircle,
  MdKeyboardArrowRight,
  MdArrowForward,
  MdArrowBack,
} from 'react-icons/md';
import { Container, MeetupsList } from './styles';

import api from '~/services/api';

export default function Dashboard() {
  const [meetup, setmeetup] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups', {
        params: { page },
      });

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const data = response.data.map(m => {
        const formatIso = parseISO(m.date_hour);
        const compareDate = utcToZonedTime(formatIso, timezone);
        return {
          time: format(formatIso, "dd 'de' MMMM', às 'HH'h'", { locale: pt }),
          past: isBefore(compareDate, new Date()),
          title: m.title,
          id: m.id,
        };
      });
      setmeetup(data);
      console.tron.log(data);
    }

    loadMeetups();
  }, [page]);

  function handlePrevPage() {
    if (page === 1) return;
    setPage(page - 1);
  }

  function handleNextPage() {
    if (meetup.length === 10) {
      setPage(page + 1);
    }
  }

  return (
    <Container>
      <header>
        <h1>Meus meetups</h1>
        <Link to="/meetups/create">
          <button type="button">Novo meetap</button>
        </Link>
      </header>

      <MeetupsList>
        {meetup.map(m => (
          <Link to={`/meetups/details/${m.id}`} key={m.id}>
            <li>
              {m.title}
              <span>{m.time}</span>
            </li>
          </Link>
        ))}
      </MeetupsList>

      {meetup.length === 0 && page === 1 ? (
        <MeetupsList>
          <Link to="/meetups/details">
            <li> Você não está organizando nenhum meetup </li>
          </Link>
        </MeetupsList>
      ) : (
        <ul>
          <li>
            <MdArrowBack size={22} color="#fff" onClick={handlePrevPage} />
          </li>
          <li>Pagina {page}</li>
          <li>
            <MdArrowForward
              size={22}
              color="#fff"
              onClick={handleNextPage}
              disabled={meetup.length !== 10 ? 'true' : 'false'}
            />
          </li>
        </ul>
      )}
    </Container>
  );
}
