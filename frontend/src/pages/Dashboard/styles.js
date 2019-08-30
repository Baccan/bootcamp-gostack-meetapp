import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 940px;
  margin: 50px auto;

  header {
    display: flex;
    justify-content: space-between;

    h1 {
      color: #fff;
    }

    button {
      margin: 5px 0 0;
      width: 162px;
      height: 44px;
      background: #f94d6a;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.07, '#F94D6A')};
      }
    }
  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    span {
      color: #fff;
    }
    svg {
      cursor: pointer;
    }

    svg[disabled] {
      cursor: default;
    }
  }
`;

export const MeetupsList = styled.ul`
  margin: 48px auto;

  li {
    background: rgba(0, 0, 0, 0.5);
    padding: 20px 30px;
    margin: 10px auto;
    color: #fff;
    font-weight: bold;
    font-size: 18px;

    display: flex;
    justify-content: space-between;

    span {
      font-weight: normal;
      font-size: 16px;
    }
  }

  a[disabled] li {
    background: rgba(0, 0, 0, 0.2);
  }
`;
