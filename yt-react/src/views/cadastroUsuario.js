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
        const { nome, email, senha, senhaRepeticao } = this.state;
        const novoUsuario = { nome, email, senha, senhaRepeticao };
        if (this.formularioEhValido(novoUsuario)) {
            this.service.salvar(novoUsuario)
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

    formularioEhValido = (usuario) => {
        try {
            this.service.validarFormulario(usuario);
            return true;
        } catch (error) {
            const listErros = error.mensagens;
            listErros.forEach(msg => mensagemErro(msg));
            return false;
        }
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <Card title="Cadastro de Usuário" colorText='white' colorCard='info'>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input className="form-control" placeholder="Judite"
                                    type="text" id="inputNome" autoComplete="username"
                                    name="nome" onChange={this.handleChange} ></input>
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input className="form-control" placeholder="judite@email.com"
                                    type="email" id="inputEmail" autoComplete="useremail"
                                    name="email" onChange={this.handleChange} ></input>
                            </FormGroup>
                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input className="form-control" placeholder="Senha"
                                    type="password" id="inputSenha" autoComplete="new-password"
                                    name="senha" onChange={this.handleChange} ></input>
                            </FormGroup>
                            <FormGroup label="Confirmar Senha: *" htmlFor="inputRepitaSenha">
                                <input className="form-control" placeholder="Confirmação a senha"
                                    type="password" id="inputRepitaSenha" autoComplete="new-password"
                                    name="senhaRepeticao" onChange={this.handleChange} ></input>
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