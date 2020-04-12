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
        status: 'PENDENTE',
        usuario: null
    }

    componentDidMount() {
        const params = this.props.match.params;

        if (params.id) {

            this.setState({ textoBotao: 'Atualizar' })
            this.setState({ textoTitle: 'Atualizando Lançamento' })

            this.service.obterPorId(params.id)
                .then(response => {
                    this.setState({ ...response.data });//'espalha' as propriedades pelo state
                })
                .catch(error => {
                    mensagens.mensagemErro(error.response.data);
                });
        }
    }

    cancelar = () => {
        this.props.history.push('/lancamentos');
    }

    prepararOperacao = () => {
        if (this.state.id !== null && this.state.id > 0)
            this.atualizar();
        else
            this.cadastrar();
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value });
    }

    cadastrar = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
        const { ano, mes, tipo, descricao, valor } = this.state;
        const novoLancamento = { ano, mes, tipo, descricao, valor, usuario: usuarioLogado.id };
   
        if(this.formularioEhValido(novoLancamento)){
            this.service.salvar(novoLancamento)
                .then(response => {
                    mensagens.mensagemSucesso("Lançamento cadastrado com sucesso.");
                    this.props.history.push('/lancamentos');
                })
                .catch(error => {
                    mensagens.mensagemErro(error.response.data);
                });
        }
    }

    atualizar = () => { 
        const { id, ano, mes, tipo, descricao, valor, usuario, status } = this.state;
        const atualizacaoLancamento = { id, ano, mes, tipo, descricao, valor, usuario, status };
        
        if(this.formularioEhValido(atualizacaoLancamento)){
            this.service.atualizar(atualizacaoLancamento)
                .then(response => {
                    mensagens.mensagemSucesso("Os dados do Lançamento foram atualizados!");
                    this.props.history.push('/lancamentos');
                })
                .catch(error => {
                    mensagens.mensagemErro(error.response.data);
                });
        }
    }

    formularioEhValido = (lancamento) =>{
        try {
            this.service.validarLancamento(lancamento);
            return true;
        } catch (error) {
            const listErros = error.mensagens;
            listErros.forEach(msg => mensagens.mensagemErro(msg));
            return false;
        }
    }

    render() {

        const meses = this.service.obterListaMeses();
        const tipos = this.service.obterTipos();

        return (
            <Card title={(this.state.id !== null && this.state.id > 0) ? 'Atualização Lançamento' : 'Novo Lançamento'} colorText='white' colorCard='danger'>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputDescricao" label="Descrição: *">
                            <input id="inputDescricao" type="text" value={this.state.descricao}
                                className="form-control" placeholder="Ex: Pagamento"
                                name='descricao' onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputAno" label="Ano: *">
                            <input id="inputAno" type="text" value={this.state.ano}
                                className="form-control" placeholder="Ex: 2020"
                                name='ano' onChange={this.handleChange} minLength="4" maxLength="4" />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputMes" label="Mês: *">
                            <SelectMenu id="inputMes" className="form-control" lista={meses}
                                value={this.state.mes} name='mes' onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputValor" label="Valor: *">
                            <input id="inputValor" type="text" value={this.state.valor}
                                className="form-control" placeholder="Ex: 350"
                                name='valor' onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputTipo" label="Tipo de Lançamento: *">
                            <SelectMenu id="inputTipo" className="form-control" lista={tipos}
                                value={this.state.tipo} name='tipo' onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputStatus" label="Status:">
                            <fieldset disabled="">
                                <input id="inputStatus" type="text"
                                    className="form-control" disabled
                                    value={this.state.status} />
                            </fieldset>
                        </FormGroup>
                    </div>
                </div>
                <button onClick={this.prepararOperacao} className="btn btn-success">{(this.state.id !== null && this.state.id > 0) ? 'Atualizar' : 'Salvar'}</button>
                <button onClick={this.cancelar} className="btn btn-secondary">Cancelar</button>
            </Card>
        )
    }
}

export default withRouter(CadastradoLancamento);