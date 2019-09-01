import React from 'react';
import { Image } from 'react-native';

import logo from '~/assets/images/logo.png';

import Background from '~/components/Background';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

export default function SignIn() {
  return (
    <Background>
      <Container>
        <Image source={logo} />

        <Form>
          <FormInput
            icon="mail-outline"
            keyboardType="email-adress"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha secreta"
          />

          <SubmitButton onPress={() => {}}>Entrar</SubmitButton>
        </Form>

        <SignLink onPress={() => {}}>
          <SignLinkText>Criar conta grátis</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}
