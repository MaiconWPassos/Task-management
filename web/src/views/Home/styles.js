import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const FilterArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 30px;

  button {
    border: none;
    outline: 0;
    background: none;
  }
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 70px;

  a {
    text-decoration: none;
  }
`;

export const Title = styled.div`
  width: 100%;
  border-bottom: 1px solid #707070;
  opacity: 60%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px;

  h3 {
    color: #707070;
    position: relative;
    top: 12px;
    background: #fff;
    padding: 0 20px;
  }
`;
