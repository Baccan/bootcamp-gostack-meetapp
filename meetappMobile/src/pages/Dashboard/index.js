import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
  const [subscriptions, setSubscriptions] = useState([]);

  const profile = useSelector(state => state.user.profile);

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

      // const subs = await api.get('/meetups/subscriptions');
      // setSubscriptions(subs);
      setMeetup(response.data);
      setLoading(false);
    }

    async function loadSubscriptions() {
      const subs = await api.get('/subscriptions');
      setSubscriptions(subs);
    }

    loadSubscriptions();
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

    try {
      await api
        .post(`/meetups/${id}/subscriptions`)
        .then(Alert.alert('Sucesso', 'Você foi inscrito no meetup'));
    } catch (error) {
      Alert.alert('Falha ao se inscrever', error.response.data.error);
    }
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
    try {
      await api
        .delete(`/meetups/${id}/subscriptions`)
        .then(
          Alert.alert('Sucesso', 'Você cancelou sua inscrição com sucesso')
        );
    } catch (error) {
      Alert.alert('Falha ao cancelar inscrição', error.response.data.error);
    }

    loadMeetups();
  }

  // const checkSub = id => {
  //   if (subscriptions.length >= 1) {
  //     const inSub = subscriptions.filter(sub => {
  //       return sub.user_id === id;
  //     });

  //     if (inSub.length >= 1) return false;
  //   }
  //   return true;
  // };

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
                Nenhum meetup encontrado para este dia {dateFormatted}
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
                  {item.user_id !== profile.id ? (
                    <SubscriptionButton
                      onPress={() => {
                        handleSubscribe(item.id);
                      }}
                    >
                      Realizar inscrição
                    </SubscriptionButton>
                  ) : (
                    <></>
                  )}
                  {item.user_id !== profile.id ? (
                    <UnsubscriptionButton onPress={() => handleUnsub(item.id)}>
                      Cancelar inscrição
                    </UnsubscriptionButton>
                  ) : (
                    <></>
                  )}
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
