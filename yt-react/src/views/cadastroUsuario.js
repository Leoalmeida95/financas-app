import React from 'react';
import { mensagemErro, mensagemSucesso, mensagemAviso } from '../components/toastr';
import { withRouter } from 'react-router-dom'
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
        var mensagensValidacoes = this.validacoes();

        if (mensagensValidacoes && mensagensValidacoes.length > 0) {
            mensagensValidacoes.forEach((msg, index) => {
                mensagemAviso(msg);
            });
            return false;
        }

        this.service.salvar(this.state)
            .then(response => {
                mensagemSucesso("Cadastro realizado com sucesso.");
                this.props.history.push('/login');
            })
            .catch(error => {
                mensagemErro(error.response.data);
            });
    }

    cancelar = () => {
        this.props.history.push('/login')
    }

    validacoes = () => {
        var msgs = [];

        if (!this.state.nome)
            msgs.push("O campo Nome é obrigatório.");

        if (!this.state.email)
            msgs.push("O campo Email é obrigatório.");
        else if (!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/))
            msgs.push("Informe um Emal válido.");

        if (!this.state.senha || !this.state.senhaRepeticao)
            msgs.push("Informe a senha e a Confirmação.");
        else if (this.state.senha !== this.state.senhaRepeticao)
            msgs.push("As senhas não coincidem.");
        else if (this.state.senha.length < 6)
            msgs.push("A senha deve ter pelo menos 6 dígitos.");

        return msgs;
    }

    render() {
        return (
            <Card title="Cadastro de Usuário" colorText='white' colorCard='danger'>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
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
                            <button onClick={this.cancelar} type="button" className="btn btn-light">Cancelar</button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroUsuario)