import React from 'react';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import {withRouter} from 'react-router-dom';

class Login extends React.Component {

    state = {
        email: '',
        senha: ''
    }

    entrar = () => {

    }

    prepareCadastrar = () =>{
        this.props.history.push('/cadastro-usuarios');
    }

    render() {
        return (
                <div className="row">
                    <div className="col-md-6" style={{ position: 'relative', left: '300px' }}>
                        <Card title='Login'>
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
                                                    value={this.state.senha}
                                                    onChange={e => this.setState({ senha: e.target.value })}
                                                    className="form-control" id="exampleInputSenha1"
                                                    placeholder="Senha" />
                                            </FormGroup>
                                            <button  className="btn btn-success">Entrar</button>
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

export default withRouter(Login) 