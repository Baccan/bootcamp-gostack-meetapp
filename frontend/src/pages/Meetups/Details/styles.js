import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 940px;
  margin: 50px auto;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;

  h1 {
    color: #fff;
  }

  div {
    button {
      height: 44px;
      padding: 12px 24px;
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
    #btn-editar {
      background: #4dbaf9;
      margin-right: 15px;

      &:hover {
        background: ${darken(0.09, '#4dbaf9')};
      }
    }
  }
`;

export const Content = styled.div`
  img {
    width: 100%;
    margin: 50px 0 25px 0;
  }

  p {
    color: #fff;
    font-size: 18px;
  }

  div {
    width: 100%;
    margin: 40px 0;
    display: flex;
    justify-content: space-between;
    span {
      color: rgba(255, 255, 255, 0.5);
      font-size: 16px;
    }

    button {
      height: 44px;
      padding: 12px 24px;
      background: #f94d6a;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      svg {
        margin-right: 5px;
      }

      &:hover {
        background: ${darken(0.07, '#F94D6A')};
      }
    }
  }
`;
