import React from 'react';
import { withRouter } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import * as mensagens from '../../components/toastr';

import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/selectMenu';
import LancamentosTable from './lancamentosTable';
import LancamentoService from '../../app/service/lancamentoService';
import {AuthContext} from '../../main/provedorAutenticacao';

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
        showConfirmDialog: false,
        lancamentoExclusao: {},
        lancamentos: []
    }

    formularioEhValido = () =>{
        try {
            this.service.validarConsulta(this.state.ano);
            return true;
        } catch (error) {
            const listErros = error.mensagens;
            listErros.forEach(msg => mensagens.mensagemErro(msg));
            return false;
        }
    }

    consultar = () => {
        if(this.formularioEhValido()){

            const lancamentoFiltro = {
                ano: this.state.ano,
                mes: this.state.mes,
                tipo: this.state.tipo,
                descricao: this.state.descricao,
                usuario: this.context.usuarioAutenticado.id
            }
    
            this.service.consultar(lancamentoFiltro)
                .then(response => {
                    this.setState({ lancamentos: response.data });
    
                    if (response.data.length > 0)
                        mensagens.mensagemInformacao("Consulta realizada com sucesso!");
                    else
                        mensagens.mensagemAviso("A consulta não retornou resultados.");
                })
                .catch(error => {
                    mensagens.mensagemErro(error.response.data);
                });
        }
    }

    alterarStatus = (lancamento,status) => {
        this.service.alterarStatus(lancamento.id,status)
        .then(response =>{
            const index = this.state.lancamentos.indexOf(lancamento);
            if(index !== -1){
                lancamento.status = status;
                this.setState({status: status})
                this.state.lancamentos.slice(index,1,lancamento);
            }
            mensagens.mensagemSucesso("O status do Lançamento foi atualizado!");
        })
        .catch(error =>{
            mensagens.mensagemErro(error.response.data);
        });
    }

    cadastrar = () => {
        this.props.history.push('/cadastro-lancamentos');
    }

    editar = (id) => {
        this.props.history.push(`/cadastro-lancamentos/${id}`);
    }

    abrirConfirmacao = (lancamento) => {
        this.setState({ showConfirmDialog: true, lancamentoExclusao: lancamento })
    }

    cancelarDialog = () => {
        this.setState({ showConfirmDialog: false, lancamentoExclusao: {} });
    }

    deletar = () => {
        this.service.deletar(this.state.lancamentoExclusao.id)
            .then(response => {
                let list_lancamentos = this.state.lancamentos;
                const indexLancamentoDelete = list_lancamentos.indexOf(this.state.lancamentoExclusao);
                list_lancamentos.splice(indexLancamentoDelete, 1);
                this.setState(list_lancamentos);
                this.cancelarDialog();
                mensagens.mensagemSucesso("Lançamento deletado com sucesso!");
            })
            .catch(error => {
                mensagens.mensagemErro(error.response.data);
            });
    }

    render() {

        const meses = this.service.obterListaMeses();
        const tipos = this.service.obterTipos();

        const confirmDialogFooter = (
            <div>
                <Button label="Sim" icon="pi pi-check" onClick={this.deletar} className="p-button-danger" />
                <Button label="Não" icon="pi pi-times" onClick={this.cancelarDialog} className="p-button-secondary" />
            </div>
        );

        return (
            <Card title="Consulta Lançamentos" colorText='white' colorCard='dark'>
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputDescricao" label="Descrição: ">
                                <input type="text" className="form-control"
                                    value={this.state.descricao} onChange={e => this.setState({ descricao: e.target.value })}
                                    id="inputDescricao" placeholder="Digite a Descricao" />
                            </FormGroup>
                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input type="text" className="form-control" minLength="4" maxLength="4"
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
                <button onClick={this.cadastrar} className="btn btn-info">Cadastrar</button>
                {
                    this.state.lancamentos && this.state.lancamentos.length ?
                        (
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="bs-component">
                                        <LancamentosTable lancamentos={this.state.lancamentos}
                                            deleteAction={this.abrirConfirmacao}
                                            editAction={this.editar} 
                                            changeAction={this.alterarStatus}/>
                                    </div>
                                </div>
                            </div>
                        )
                        :
                        (
                            <>
                            </>
                        )
                }
                <div>
                    <Dialog header="Confirmação"
                        visible={this.state.showConfirmDialog}
                        style={{ width: '15vw' }}
                        modal={true}
                        // position='top'
                        footer={confirmDialogFooter}
                        onHide={() => this.setState({ showConfirmDialog: false })}>
                        Deseja excluir o Lancamento?
                    </Dialog>
                </div>
            </Card>
        )
    }
}

Lancamentos.contextType = AuthContext;

export default withRouter(Lancamentos);