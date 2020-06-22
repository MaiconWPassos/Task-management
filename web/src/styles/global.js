import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

    }
    html, body, #root{
      height: 100%;
    }

    body {
      font-family: 'Raleway', sans-serif;
      background: '#fefcfd';
    }
  
    button {
      border: none;
      background: none;
      cursor: pointer;
      outline: none;
    }

    input {
      outline: none;
    }
`;
