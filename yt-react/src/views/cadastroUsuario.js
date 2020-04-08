import React from 'react';

import Card from '../components/card';
import FormGroup from '../components/form-group';
import {withRouter} from 'react-router-dom';

class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    cadastrar = () => {

    }

    cancelar = () => {
        this.props.history.push('/login')
    }

    render() {
        return (
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input className="form-control"
                                    type="text" id="inputNome"
                                    name="nome" onChange={e => this.setState({ nome: e.target.value })}></input>
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input className="form-control"
                                    type="email" id="inputEmail"
                                    name="email" onChange={e => this.setState({ email: e.target.value })}></input>
                            </FormGroup>
                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input className="form-control"
                                    type="password" id="inputSenha"
                                    name="senha" onChange={e => this.setState({ senha: e.target.value })}></input>
                            </FormGroup>
                            <FormGroup label="Confirmar Senha: *" htmlFor="inputRepitaSenha">
                                <input className="form-control"
                                    type="password" id="inputRepitaSenha"
                                    name="senhaRepeticao" onChange={e => this.setState({ senhaRepeticao: e.target.value })}></input>
                            </FormGroup>
                            <button onClick={this.cadastrar} type="button" className="btn btn-success">Salvar</button>
                            <button onClick={this.cancelar} type="button" className="btn btn-warning">Cancelar</button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default CadastroUsuario