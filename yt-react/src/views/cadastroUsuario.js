import React from 'react';
import { mensagemErro, mensagemSucesso, mensagemAviso } from '../components/toastr';
import {withRouter} from 'react-router-dom'
import Card from '../components/card';
import FormGroup from '../components/form-group';
import UsuarioService from '../app/service/usuarioService';

class CadastroUsuario extends React.Component {

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    cadastrar = () => {
        if (this.formEhValdio()) {
            this.service.salvar(this.state)
                .then(response => {
                        mensagemSucesso("Cadastro realizado com sucesso.");
                        this.props.history.push('/login');
                    })
                .catch(error => {
                        mensagemErro(error.response.data);
                    });
        }
    }

    cancelar = () => {
        this.props.history.push('/login')
    }

    formEhValdio = () => {
        if (this.state.senha !== this.state.senhaRepeticao) {
            mensagemAviso("As senhas não coincidem.");
            return false;
        }

        return true;
    }

    render() {
        return (
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <form>
                                <FormGroup label="Nome: *" htmlFor="inputNome">
                                    <input className="form-control"
                                        type="text" id="inputNome" autoComplete="username"
                                        name="nome" onChange={e => this.setState({ nome: e.target.value })}></input>
                                </FormGroup>
                                <FormGroup label="Email: *" htmlFor="inputEmail">
                                    <input className="form-control"
                                        type="email" id="inputEmail" autoComplete="useremail"
                                        name="email" onChange={e => this.setState({ email: e.target.value })}></input>
                                </FormGroup>
                                <FormGroup label="Senha: *" htmlFor="inputSenha">
                                    <input className="form-control"
                                        type="password" id="inputSenha" autoComplete="new-password"
                                        name="senha" onChange={e => this.setState({ senha: e.target.value })}></input>
                                </FormGroup>
                                <FormGroup label="Confirmar Senha: *" htmlFor="inputRepitaSenha">
                                    <input className="form-control"
                                        type="password" id="inputRepitaSenha" autoComplete="new-password"
                                        name="senhaRepeticao" onChange={e => this.setState({ senhaRepeticao: e.target.value })}></input>
                                </FormGroup>
                                <button onClick={this.cadastrar} type="button" className="btn btn-success">Salvar</button>
                                <button onClick={this.cancelar} type="button" className="btn btn-warning">Cancelar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroUsuario)