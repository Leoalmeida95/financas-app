import React from 'react';
import { withRouter } from 'react-router-dom';

import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/selectMenu';
import LancamentosTable from './lancamentosTable';
import LancamentoService from '../../app/service/lancamentoService';
import LocalStorageService from '../../app/service/localStorageService';
import { mensagemErro, mensagemInformacao, mensagemAviso, mensagemSucesso } from '../../components/toastr';

class Lancamentos extends React.Component {

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        lancamentos: []
    }

    consultar = () => {

        if(!this.state.ano){
            mensagemAviso("O Ano é obrigatório.");
            return;
        }

        const idUsuario = LocalStorageService.obterItem('_usuario_logado').id;

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: idUsuario
        }

        this.service.consultar(lancamentoFiltro)
            .then(response => {
                this.setState({ lancamentos: response.data });
                mensagemInformacao("Consulta realizada com sucesso!");
            })
            .catch(error => {
                mensagemErro(error.response.data);
            });
    }

    cadastrar = () => {

    }

    editar = (id) => {

    }

    deletar = (lancamento) => {
        this.service.deletar(lancamento.id)
            .then(response =>{
                let list_lancamentos = this.state.lancamentos;
                const indexLancamentoDelete = list_lancamentos.indexOf(lancamento);
                list_lancamentos.splice(indexLancamentoDelete,1);
                this.setState(list_lancamentos);
                mensagemSucesso("Lançamento deletado com sucesso!");
            })
            .catch(error =>{
                mensagemErro(error.response.data);
            });

        
    }

    render() {

        const meses = this.service.obterListaMeses();
        const tipos = this.service.obterTipos();

        return (
            <Card title="Consulta Lançamentos" colorText='dark' colorCard='light'>
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputDescricao" label="Descrição: ">
                                <input type="text" className="form-control"
                                    value={this.state.descricao} onChange={e => this.setState({ descricao: e.target.value })}
                                    id="inputDescricao" placeholder="Digite a Descricao" />
                            </FormGroup>
                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input type="text" className="form-control"
                                    value={this.state.ano} onChange={e => this.setState({ ano: e.target.value })}
                                    id="inputAno" placeholder="Digite o Ano" />
                            </FormGroup>
                            <FormGroup htmlFor="inputMes" label="Mês:">
                                <SelectMenu id="inputMes" className="form-control" lista={meses}
                                    value={this.state.mes} onChange={e => this.setState({ mes: e.target.value })} />
                            </FormGroup>
                            <FormGroup htmlFor="inputTipo" label="Tipo de Lançamento:">
                                <SelectMenu id="inputTipo" className="form-control" lista={tipos}
                                    value={this.state.tipo} onChange={e => this.setState({ tipo: e.target.value })} />
                            </FormGroup>
                        </div>
                    </div>
                </div>
                <button onClick={this.consultar} className="btn btn-warning">Consultar</button>
                <button onClick={this.cadastrar} className="btn btn-success">Cadastrar</button>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos}
                                              deleteAction={this.deletar}
                                              editAction={this.editar} />
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(Lancamentos);