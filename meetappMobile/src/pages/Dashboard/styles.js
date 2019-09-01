import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
`;

export const Meetups = styled.FlatList`
  padding-bottom: 200px;
`;

export const DatePicker = styled.View`
  margin: 10px 0;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
`;

export const DateTitle = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 22px;
`;

export const Meetup = styled.View`
  background: #fff;
  margin: 20px;
  border-radius: 4px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #000;
  font-weight: bold;
`;

export const DateMeetup = styled.View`
  margin-top: 9px;
  align-content: center;
  flex-direction: row;
`;

export const Location = styled.View`
  margin-top: 9px;
  align-content: center;
  flex-direction: row;
`;

export const Organizer = styled.View`
  margin-top: 9px;
  align-content: center;
  flex-direction: row;
`;

export const SubscriptionButton = styled(Button)`
  margin-top: 10px;
  background: #ff264b;
`;

export const UnsubscriptionButton = styled(Button)`
  margin-top: 10px;
`;

export const Image = styled.Image`
  align-self: center;
  border-radius: 4px;
  height: 150px;
  width: 340px;
`;

export const Info = styled.View`
  padding: 20px;
`;

export const DateText = styled.Text`
  font-size: 16px;
  margin-top: -3px;
  color: #999;
  margin-left: 4px;
`;

export const LocationText = styled.Text`
  font-size: 16px;
  margin-top: -3px;
  color: #999;
  margin-left: 4px;
`;

export const OrganizerText = styled.Text`
  font-size: 16px;
  margin-top: -3px;
  color: #999;
  margin-left: 4px;
`;

export const Box = styled.View`
  background: #fff;
  padding: 30px;
  margin: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;

export const NoMettup = styled.Text`
  color: #000;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
`;
