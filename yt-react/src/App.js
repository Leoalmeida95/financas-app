import React from 'react';

import Login from './views/login';
import CadastroUsuario from './views/cadastroUsuario';

import 'bootswatch/dist/sketchy/bootstrap.css';
import './custom.css'

class App extends React.Component {

  render() {
    return (
      <div className="container">
        <div>
          <CadastroUsuario />
        </div>
      </div>
    )
  }
}

export default App
