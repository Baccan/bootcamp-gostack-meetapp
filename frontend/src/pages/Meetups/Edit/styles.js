import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 940px;
  margin: 50px auto;

  h1 {
    color: #fff;
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
      color: #f94d6a;
      align-self: flex-start;
      margin: 0 0 10px;
    }

    hr {
      border: 0;
      height: 1px;
      background: #979797;
      margin: 30px 0 15px 0;
    }

    div {
      display: flex;
      justify-content: flex-end;

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
  }
`;
