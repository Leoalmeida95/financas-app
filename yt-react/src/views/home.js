import React from 'react';
import UsuarioService from '../app/service/usuarioService';
import LocalStorageService from '../app/service/localStorageService';
import {mensagemErro,mensagemSucesso} from '../components/toastr';

class Home extends React.Component {

    state = {
        saldo: 0,
        usuario_email: null
    }

    constructor() {
        super();
        this.usuarioService = new UsuarioService();
    }

    componentDidMount(){
        var usuario_logado = LocalStorageService.obterItem('_usuario_logado');
        this.setState({usuario_email: usuario_logado.email});

        this.usuarioService.obterSaldoPorUsuario(usuario_logado.id)
                .then(response => {
                    this.setState({saldo: response.data})
                })
                .catch(error => {
                    mensagemErro(error.response.data);
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