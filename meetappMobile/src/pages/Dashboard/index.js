import React, { useState, useMemo, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, subDays, addDays, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import {
  Container,
  Box,
  NoMettup,
  DatePicker,
  DateTitle,
  Title,
  Meetup,
  DateMeetup,
  DateText,
  Meetups,
  LocationText,
  OrganizerText,
  Location,
  Organizer,
  SubscriptionButton,
  UnsubscriptionButton,
  Image,
  Info,
} from './styles';
import Header from '~/components/Header';
import Background from '~/components/Background';
import api from '~/services/api';

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [meetup, setMeetup] = useState([]);

  // async function loadMore() {
  //   const nextPage = page + 1;

  //   const response = await api.get('meetups', {
  //     params: { date, users: 0, page: nextPage },
  //   });
  //   const { data } = response;
  //   if (data.length > 0) {
  //     setMeetup([...meetup, ...data]);
  //   }
  //   setPage(nextPage);
  // }

  async function loadMoreMeetups() {
    setLoading(true);
    setPage(1);
    const response = await api.get('meetups', {
      params: { date, users: 0, page },
    });
    // setMeetup([]);
    setMeetup(response.data);
    setLoading(false);
  }

  useEffect(() => {
    async function loadMeetups() {
      setLoading(true);
      setPage(1);
      const response = await api.get('meetups', {
        params: { date, users: 0, page },
      });
      // setMeetup([]);
      setMeetup(response.data);
      setLoading(false);
    }
    loadMeetups();
  }, [date, page]);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  async function handleSubscribe(id) {
    async function loadMeetups() {
      setLoading(true);
      setPage(1);
      const response = await api.get('meetups', {
        params: { date, users: 0, page },
      });
      // setMeetup([]);
      setMeetup(response.data);
      setLoading(false);
    }
    await api
      .post(`/meetups/${id}/subscription`)
      .then(Alert.alert('Sucesso', 'Você foi inscrito no meetup'))
      .catch(function(error) {
        if (error.response) {
          Alert.alert('Falha ao se inscrever', error.response.data.error);
        }
      });
    loadMeetups();
  }

  async function handleUnsub(id) {
    async function loadMeetups() {
      setLoading(true);
      setPage(1);
      const response = await api.get('meetups', {
        params: { date, users: 0, page },
      });
      // setMeetup([]);
      setMeetup(response.data);
      setLoading(false);
    }
    const response = await api
      .delete(`/meetups/${id}/subscription`)
      .then(Alert.alert('Sucesso', 'Você cancelou sua inscrição com sucesso'))
      .catch(function(error) {
        if (error.response) {
          Alert.alert('Falha ao cancelar inscrição', error.response.data.error);
        }
      });
    loadMeetups();
  }

  return (
    <Background>
      <Container>
        <Header />
        <DatePicker>
          <TouchableOpacity onPress={handlePrevDay}>
            <Icon name="keyboard-arrow-left" size={26} color="#fff" />
          </TouchableOpacity>

          <DateTitle>{dateFormatted}</DateTitle>

          <TouchableOpacity onPress={handleNextDay}>
            <Icon name="keyboard-arrow-right" size={26} color="#fff" />
          </TouchableOpacity>
        </DatePicker>
        {meetup.length === 0 ? (
          <Box>
            {loading ? (
              <ActivityIndicator color="#402845" size="large" />
            ) : (
              <NoMettup>
                Nenhum meetup encontrado no dia {dateFormatted}
              </NoMettup>
            )}
          </Box>
        ) : (
          <Meetups
            onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
            onEndReached={loadMoreMeetups} // Função que carrega mais itens
            onRefresh={loadMoreMeetups} // Função dispara quando o usuário arrasta a lista pra baixo
            refreshing={false} // Variável que armazena um estado true/false que representa se a lista está atualizando
            data={meetup}
            extraData={meetup}
            keyExtractor={m => String(m.id)}
            renderItem={({ item }) => (
              <Meetup>
                <Image
                  source={{
                    uri: `http://192.168.0.5:3333/files/${item.image.path}`,
                  }}
                />
                <Info>
                  <Title>{item.title}</Title>
                  <DateMeetup>
                    <Icon name="event" size={16} color="#999" />
                    <DateText>
                      {format(
                        parseISO(item.date_hour),
                        "d 'de' MMMM ', às' HH:mm",
                        {
                          locale: pt,
                        }
                      )}
                    </DateText>
                  </DateMeetup>
                  <Location>
                    <Icon name="place" size={16} color="#999" />
                    <LocationText>{item.location}</LocationText>
                  </Location>
                  <Organizer>
                    <Icon name="person" size={16} color="#999" />
                    <OrganizerText>Organizador: {item.user.name}</OrganizerText>
                  </Organizer>
                  {/* {item.Subscriptions.length === 0 ? (
                    <SubscriptionButton
                      onPress={() => {
                        handleSubscribe(item.id);
                      }}
                    >
                      Realizar inscrição
                    </SubscriptionButton>
                  ) : (
                    <UnsubscriptionButton onPress={() => handleUnsub(item.id)}>
                      Cancelar inscrição
                    </UnsubscriptionButton>
                  )} */}
                </Info>
              </Meetup>
            )}
          />
        )}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};
