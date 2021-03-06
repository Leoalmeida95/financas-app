import React from 'react';

import Rotas from './rotas';
import Navbar from '../components/navbar';
import ProvedorAutenticacao from './provedorAutenticacao';
import Footer from '../components/footer';

import 'bootswatch/dist/sketchy/bootstrap.css';
import '../custom.css';
import 'toastr/build/toastr.css';
import 'toastr/build/toastr.min.js';
import 'primereact/resources/themes/nova-dark/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

class App extends React.Component {

  render() {
    return (
      <ProvedorAutenticacao>
        <Navbar />
        <div className="container">
          <Rotas />
          <Footer />
        </div>
      </ProvedorAutenticacao>
    )
  }
}

export default App;