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
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input,
    textarea {
      background: rgba(0, 0, 0, 0.3);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;
      font-size: 16px;

      &:focus {
        background: rgba(0, 0, 0, 0.1);
      }

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }

    #description {
      height: 200px;
      padding-top: 10px;
    }

    textarea {
      font-family: 'Roboto', Times, serif;
    }

    span {
      margin: -10px 0 10px 0;
      color: #f94d6a;
    }
  }

  header button,
  button[type='submit'] {
    align-self: flex-end;
    width: 162px;
    height: 44px;
    background: #f94d6a;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;

    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      margin-right: 5px;
    }

    &:hover {
      background: ${darken(0.07, '#F94D6A')};
    }
  }
`;
