import React from 'react';
import { withRouter } from 'react-router-dom';

import Card from '../components/card';
import FormGroup from '../components/form-group';
import SelectMenu from '../components/selectMenu';

class Lancamentos extends React.Component {
    
    meses = [
        { label: 'Selecione...', value: '' },
        { label: 'Janeiro', value: '1' },
        { label: 'Fevereiro', value: '2' },
        { label: 'Março', value: '3' },
        { label: 'Abril', value: '4' },
        { label: 'Maio', value: '5' },
        { label: 'Junho', value: '6' },
        { label: 'Julho', value: '7' },
        { label: 'Agosto', value: '8' },
        { label: 'Setembro', value: '9' },
        { label: 'Outubro', value: '10' },
        { label: 'Novembro', value: '11' },
        { label: 'Dezembro', value: '12' },
    ]

    tipos=[
        { label: 'Selecione...', value: '' },
        { label: 'Despesa', value: 'DESPESA' },
        { label: 'Receita', value: 'RECEITA' }
    ]
    
    render() {

        return (
            <Card title="Consulta Lançamentos" colorText='white' colorCard='info'>
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input type="text" className="form-control"
                                    id="inputAno" placeholder="Digite o Ano" />
                            </FormGroup>
                            <FormGroup htmlFor="inputMes" label="Mes:">
                                <SelectMenu id="inputMes" className="form-control" lista={this.meses} />
                            </FormGroup>
                            <FormGroup htmlFor="inputTipo" label="Tipo:">
                                <SelectMenu id="inputTipo" className="form-control" lista={this.tipos} />
                            </FormGroup>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(Lancamentos);