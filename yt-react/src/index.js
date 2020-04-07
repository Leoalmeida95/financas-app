import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(
  //O componente a ser renderizado
  <React.StrictMode>
    <App />
  </React.StrictMode>,

  //Onde o componente é renderizado
  document.getElementById('root')
);

