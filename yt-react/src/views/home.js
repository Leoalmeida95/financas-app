import React from 'react';
import { mensagemErro } from '../components/toastr';

import UsuarioService from '../app/service/usuarioService';
import LocalStorageService from '../app/service/localStorageService';
import currencyFormatter from 'currency-formatter';

class Home extends React.Component {

    state = {
        saldo: 0,
        usuario_nome: null
    }

    constructor() {
        super();
        this.usuarioService = new UsuarioService();
    }

    componentDidMount() {
        var usuario_logado = LocalStorageService.obterItem('_usuario_logado');
        this.setState({ usuario_nome: usuario_logado.nome });

        this.usuarioService.obterSaldoPorUsuario(usuario_logado.id)
            .then(response => {
                this.setState({ saldo: response.data })
            })
            .catch(error => {
                mensagemErro(error.response.data);
            });
    }

    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-2">Bem vindo(a)!</h1>
                <p className="lead">{this.state.usuario_nome}, esse é seu sistema de finanças.</p>
                <p className="lead">Seu saldo para o mês atual é de {currencyFormatter.format(`${this.state.saldo}`, { locale: 'pt-br' })}</p>
                <hr className="my-4" />
                <p>Essa é uma área administrativa, utilize um dos botões abaixo para navegar pelo sites.</p>
                <h4>
                    Novo Lançamentos <a className="btn btn-info btn-danger btn-sm" href="#/cadastro-lancamentos" role="button"><i className="pi pi-dollar" style={{'fontSize': '2em'}}></i></a>
                </h4>
                <h4>
                    Novo Usuário <a className="btn btn-info btn-sm" href="#/cadastro-usuarios" role="button"><i className="pi pi-user-plus" style={{'fontSize': '2em'}}></i></a>
                </h4>
            </div>
        )
    }
}

export default Home;