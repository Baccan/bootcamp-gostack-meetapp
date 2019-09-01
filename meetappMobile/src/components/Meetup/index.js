import React from 'react';
import { View } from 'react-native';

import { Container } from './styles';

export default function Meetups() {
  return (
    <Container>
      <View />
    </Container>
  );
}

/* <Meetup>
  <Image
    source={{
      uri: item.File.url,
    }}
  />
  <Info>
    <Title>{item.title}</Title>
    <DateMeetup>
      <Icon name="event" size={16} color="#999" />
      <DateText>
        {format(parseISO(item.date), "d 'de' MMMM ', às' HH:mm", {
          locale: pt,
        })}
      </DateText>
    </DateMeetup>
    <Location>
      <Icon name="place" size={16} color="#999" />
      <LocationText>{item.location}</LocationText>
    </Location>
    <Organizer>
      <Icon name="person" size={16} color="#999" />
      <OrganizerText>Organizador: {item.User.name}</OrganizerText>
    </Organizer>
    {item.Subscriptions.length === 0 ? (
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
    )}
  </Info>
</Meetup>; */
