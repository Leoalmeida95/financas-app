import React from 'react';
import axios from 'axios';

class Home extends React.Component {

    state = {
        saldo: 0,
        usuario_email: null
    }

    componentDidMount(){
        var usuario_logado = JSON.parse(localStorage.getItem('_usuario_logado'));  
        this.state.usuario_email = usuario_logado.email;
        //usando a crase pra transformar a url em um tamplateString
        axios.get(`http://localhost:8080/api/usuarios/${usuario_logado.id}/saldo`)
             .then(response => {
                 this.setState({saldo: response.data})
             })
             .catch(error => {
                
             })
    }

    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo(a)!</h1>
                <p className="lead">{this.state.usuario_email}, esse é seu sistema de finanças.</p>
        <p className="lead">Seu saldo para o mês atual é de R${this.state.saldo}</p>
                <hr className="my-4" />
                <p>Essa é uma área administrativa, utilize um dos botões abaixo para navegar pelo sites.</p>
                <p className="lead">
                    <a className="btn btn-info btn-lg" href="#/cadastro-usuarios" role="button">Cadastrar Usuário</a>
                    <a className="btn btn-info btn-danger btn-lg" href="#/lancamentos" role="button">Cadastrar Lançamento</a>
                </p>
            </div>
        )
    }
}

export default Home