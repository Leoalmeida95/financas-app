import React from 'react'

import Card from '../components/card'
import FormGroup from '../components/form-group'

class CadastroUsuario extends React.Component {

    state={
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    render() {
        return (
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input type="text" id="inputNome" 
                                name="nome" onChange={e=> this.setState({nome: e.target.value})}></input>
                            </FormGroup>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default CadastroUsuario