import React from 'react';
// import { Image } from 'react-native';
import logo from '~/assets/images/logo.png';

import { Container, ImageLogo } from './styles';

export default function Header() {
  return (
    <Container>
      <ImageLogo source={logo} />
    </Container>
  );
}
