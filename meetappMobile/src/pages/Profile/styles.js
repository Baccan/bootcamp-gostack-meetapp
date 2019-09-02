import styled from 'styled-components/native';
import { Platform } from 'react-native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  // para o teclado não ficar encima da aplicação
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-bottom: 21px;
`;

export const Form = styled.View`
  align-self: stretch;
  /* padding: 10px 15px; */
  margin: 10px 15px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-bottom: 5px;
  background: #e5556e;
`;

export const SignLink = styled.TouchableOpacity`
  margin-top: 20px;
  align-items: center;
`;

export const SignText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;

export const LogoutButton = styled(Button)`
  margin-top: 5px;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 10px 0 20px;
`;
