import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { ActivityIndicator, Alert } from 'react-native';
import {
  Container,
  Title,
  Meetup,
  DateMeetup,
  DateText,
  LocationText,
  OrganizerText,
  Location,
  Organizer,
  Image,
  Info,
  Meetups,
  Box,
  NoMettup,
  UnsubscriptionButton,
} from './styles';
import Header from '~/components/Header';
import Background from '~/components/Background';
import api, { baseURL } from '~/services/api';

export default function Subscription() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [meetup, setMeetup] = useState([]);

  async function loadMeetups() {
    setLoading(true);
    setPage(1);
    const response = await api.get('/subscriptions');
    setMeetup(response.data);
    setLoading(false);
  }

  async function loadMoreMeetups() {
    setLoading(true);

    const nextPage = page + 1;
    const response = await api.get('/subscriptions', {
      params: {
        page: nextPage,
      },
    });
    const { data } = response;
    if (data.length > 0) {
      setMeetup([...meetup, ...data]);
    }
    setPage(nextPage);
    setLoading(false);
  }

  useEffect(() => {
    loadMeetups();
  }, []);

  async function handleUnsub(id) {
    await api
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

        {meetup.length === 0 && (
          <Box>
            <NoMettup>Você não está inscrito em nenhum meetup</NoMettup>
          </Box>
        )}

        <Meetups
          onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
          onEndReached={loadMoreMeetups} // Função que carrega mais itens
          onRefresh={loadMeetups} // Função dispara quando o usuário arrasta a lista pra baixo
          refreshing={false}
          data={meetup}
          keyExtractor={item => String(item.meetup_id)}
          renderItem={({ item }) => (
            <Meetup key={item.id}>
              <Image
                source={{
                  uri: `${baseURL}/files/${item.meetup.image.path}`,
                }}
              />
              <Info>
                <Title>{item.meetup.title}</Title>
                <DateMeetup>
                  <Icon name="event" size={16} color="#999" />
                  <DateText>
                    {format(
                      parseISO(item.meetup.date_hour),
                      "d 'de' MMMM ', às' HH:mm",
                      {
                        locale: pt,
                      }
                    )}
                  </DateText>
                </DateMeetup>
                <Location>
                  <Icon name="place" size={16} color="#999" />
                  <LocationText>{item.meetup.location}</LocationText>
                </Location>
                <Organizer>
                  <Icon name="person" size={16} color="#999" />
                  <OrganizerText>
                    Organizador:
                    {item.meetup.user.name}
                  </OrganizerText>
                </Organizer>

                <UnsubscriptionButton
                  onPress={() => handleUnsub(item.meetup.id)}
                >
                  Cancelar inscrição
                </UnsubscriptionButton>
              </Info>
            </Meetup>
          )}
        />
      </Container>
    </Background>
  );
}

Subscription.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};
