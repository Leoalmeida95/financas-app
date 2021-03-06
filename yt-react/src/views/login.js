import React from 'react';
import { withRouter } from 'react-router-dom';

import FormGroup from '../components/form-group';
import Card from '../components/card';
import { mensagemErro, mensagemSucesso } from '../components/toastr';

import UsuarioService from '../app/service/usuarioService';
import {AuthContext} from '../main/provedorAutenticacao';

class Login extends React.Component {

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    state = {
        email: '',
        senha: ''
    }

    entrar = () => {
        this.service.autenticar(this.state)
            .then(response => {
                this.context.iniciarSessao(response.data);
                mensagemSucesso("Seja bem-vindo!");
                this.props.history.push('/home');
            })
            .catch(error => {
                mensagemErro(error.response.data);
            });
    }

    prepareCadastrar = () => {
        this.props.history.push('/cadastro-usuarios');
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6" style={{ position: 'relative', left: '300px' }}>
                    <Card title='Login' colorText='white' colorCard='primary'>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="bs-component">
                                    <fieldset>
                                        <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                            <input type="email"
                                                value={this.state.email}
                                                onChange={e => this.setState({ email: e.target.value })}
                                                className="form-control" id="exampleInputEmail1"
                                                aria-describedby="emailHelp" placeholder="Digite o Email" />
                                        </FormGroup>
                                        <FormGroup label="Senha: *" htmlFor="exampleInputSenha1">
                                            <input type="password"
                                                autoComplete="on"
                                                value={this.state.senha}
                                                onChange={e => this.setState({ senha: e.target.value })}
                                                className="form-control" id="exampleInputSenha1"
                                                placeholder="Senha" />
                                        </FormGroup>
                                        <button onClick={this.entrar} className="btn btn-success">Entrar</button>
                                        <button onClick={this.prepareCadastrar} className="btn btn-warning">Cadastrar</button>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        )
    }
}

Login.contextType = AuthContext;

export default withRouter(Login);