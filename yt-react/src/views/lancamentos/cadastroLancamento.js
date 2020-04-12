import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/selectMenu';
import LancamentoService from '../../app/service/lancamentoService';

class CadastradoLancamento extends React.Component {

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: ''
    }

    cancelar = () => {
        this.props.history.push('/lancamentos');
    }


    render() {

        const meses = this.service.obterListaMeses();
        const tipos = this.service.obterTipos();

        return (
            <Card title="Novo Lançamento" colorText='white' colorCard='info'>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputDescricao" label="Descrição: *">
                            <input id="inputDescricao" type="text"
                                className="form-control" placeholder="Ex: Pagamento" />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputAno" label="Ano: *">
                            <input id="inputAno" type="text"
                                className="form-control" placeholder="Ex: 2020" />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputMes" label="Mês:">
                            <SelectMenu id="inputMes" className="form-control" lista={meses}
                                value={this.state.mes} onChange={e => this.setState({ mes: e.target.value })} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputValor" label="Valor: *">
                            <input id="inputValor" type="text"
                                className="form-control" placeholder="Ex: 350   " />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputTipo" label="Tipo de Lançamento:">
                            <SelectMenu id="inputTipo" className="form-control" lista={tipos}
                                value={this.state.tipo} onChange={e => this.setState({ tipo: e.target.value })} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputStatus" label="Status: *">
                            <fieldset>
                                <input id="inputStatus" type="text"
                                    className="form-control" readonly=""
                                    value="PENDENTE" />
                            </fieldset>
                        </FormGroup>
                    </div>
                </div>
                <button onClick={this.cadastrar} class="btn btn-success">Salvar</button>
                <button onClick={this.cancelar} class="btn btn-secondary">Cancelar</button>
            </Card>
        )
    }
}

export default withRouter(CadastradoLancamento);