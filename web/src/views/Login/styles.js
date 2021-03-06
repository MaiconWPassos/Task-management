import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  height: 100vh;
  margin: 0 auto;
  /* flex */
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Section = styled.div`
  width: 50%;
  max-width: 350px;

  img {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  form {
    margin-top: 32px;

    a {
      font-size: 1rem;
      margin-bottom: 32px;
      text-align: center;
      color: #747474;
      text-decoration: none;
    }
    input {
      width: 100%;
      margin-bottom: 15px;
      margin-top: 10px;
      padding: 12px 16px;
      border-radius: 4px;
      border: 1px solid #ddd;
      font-size: 15px;
      color: #444;
      transition: border-color 0.2s;
      outline: 0;

      &:focus {
        border-color: #7159c1;
      }
    }

    .button {
      width: 100%;
      height: 60px;
      background: #7159c1;
      border: 0;
      border-radius: 8px;
      color: #fff;
      font-weight: 700;
      margin-top: 16px;
      display: inline-block;
      text-align: center;
      text-decoration: none;
      font-size: 18px;
      line-height: 60px;
      transition: filter 0.2s;
    }

    .button:hover {
      filter: brightness(90%);
    }

    .back-link {
      display: flex;
      align-items: center;
      margin-top: 20px;
      color: #41414d;
      font-size: 18px;
      text-decoration: none;
      font-weight: 500;
      transition: opacity 0.2s;
    }

    .back-link svg {
      margin-right: 8px;
    }

    .back-link:hover {
      opacity: 0.8;
    }
  }
`;
