import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './style/index.css'
import Themes from './style/Themes'
import { ThemeProvider } from 'styled-components'

ReactDOM.render(
  <ThemeProvider theme={Themes.primary}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);

