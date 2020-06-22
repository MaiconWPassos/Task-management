import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 260px;
  height: 100px;
  background: ${(props) => (props.actived ? '#7159C1' : '#707070')};
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  opacity: 1;
  -webkit-box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.2);
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.2);

  img {
    width: 30;
    height: 27px;
    color: #fff;
    align-self: flex-start;
  }

  span {
    font-weight: bold;
    font-size: 16px;
    color: #fff;
    align-self: flex-end;
  }

  &:hover {
    background: #7159c1;
    transition: 0.5s;
    opacity: 1;
  }
`;
