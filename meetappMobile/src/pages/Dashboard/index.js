import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';

import { Container, Title } from './styles';

export default function Dashboard() {
  return (
    <Background>
      <Container>
        <Title>01 de Agosto de 2019</Title>
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};
