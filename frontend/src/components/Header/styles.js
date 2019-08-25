import styled from 'styled-components';

export const Container = styled.div`
  background: #0f0f0f;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 92px;
  max-width: 940px;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Profile = styled.div`
  display: flex;
  margin: 27px 0;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #fff;
      font-size: 14px;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 14px;
      color: #999;
    }
  }

  img {
    height: 32px;
    width: 32px;
    border-radius: 50%;
  }

  button {
    margin-left: 30px;
    background: #d44059;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    padding: 12px 20px;
  }
`;
