import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/selectMenu';
import LancamentoService from '../../app/service/lancamentoService';
import * as mensagens from '../../components/toastr';
import LocalStorageService from '../../app/service/localStorageService';

class CadastradoLancamento extends React.Component {

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    state = {
        id: null,
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        valor: '',
        status: 'PENDENTE'
    }

    cancelar = () => {
        this.props.history.push('/lancamentos');
    }
    
    handleChange = (event) =>{
        const value = event.target.value;
        const name = event.target.name;
        this.setState({[name]:value});
    }

    cadastrar = ()=>{
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
        const {ano, mes, tipo, descricao, valor} = this.state;
        const novoLancamento = {ano, mes, tipo, descricao, valor, usuario: usuarioLogado.id};

        this.service.salvar(novoLancamento)
        .then(response => {
            mensagens.mensagemSucesso("Lançamento cadastrado com sucesso.");
            this.props.history.push('/lancamentos');
        })
        .catch(error =>{
            mensagens.mensagemErro(error.response.data);
        });
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
                                className="form-control" placeholder="Ex: Pagamento"
                                name='descricao' onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputAno" label="Ano: *">
                            <input id="inputAno" type="text"
                                className="form-control" placeholder="Ex: 2020"
                                name='ano' onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputMes" label="Mês:">
                            <SelectMenu id="inputMes" className="form-control" lista={meses}
                                value={this.state.mes} name='mes' onChange={this.handleChange}  />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputValor" label="Valor: *">
                            <input id="inputValor" type="text" value={this.state.valor}
                                className="form-control" placeholder="Ex: 350"
                                name='valor' onChange={this.handleChange}  />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputTipo" label="Tipo de Lançamento:">
                            <SelectMenu id="inputTipo" className="form-control" lista={tipos}
                                value={this.state.tipo} name='tipo' onChange={this.handleChange}  />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputStatus" label="Status: *">
                            <fieldset disabled="">
                                <input id="inputStatus" type="text"
                                    className="form-control" disabled
                                    value={this.state.status} />
                            </fieldset>
                        </FormGroup>
                    </div>
                </div>
                <button onClick={this.cadastrar} className="btn btn-success">Salvar</button>
                <button onClick={this.cancelar} className="btn btn-secondary">Cancelar</button>
            </Card>
        )
    }
}

export default withRouter(CadastradoLancamento);