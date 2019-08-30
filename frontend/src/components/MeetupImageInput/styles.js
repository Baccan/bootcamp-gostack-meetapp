import styled from 'styled-components';

export const Container = styled.div`
  label {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    margin-bottom: 5px;
    width: 100%;
    height: 250px;
    color: rgba(255, 255, 255, 0.7);
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.5);
    cursor: pointer;

    &:hover {
      background: rgba(0, 0, 0, 0.3);
    }

    img {
      max-width: 40%;
      max-height: 40%;
    }

    input {
      display: none;
    }
  }
`;
