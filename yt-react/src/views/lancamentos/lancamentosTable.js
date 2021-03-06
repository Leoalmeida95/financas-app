import React from 'react';
import currencyFormatter from 'currency-formatter';
import LancamentoService from '../../app/service/lancamentoService';
import SelectMenu from '../../components/selectMenu';
// import FormGroup from '../../components/form-group';

export default props => {

    const service = new LancamentoService();
    const listStatus = service.obterStatus();

    var rows = props.lancamentos.map(lanc => {
        return (
            <tr className="table-ligh text-center" key={lanc.id}>
                <td>{lanc.descricao}</td>
                <td>{currencyFormatter.format(lanc.valor, { locale: 'pt-br' })}</td>
                <td>{lanc.tipo}</td>
                <td>{service.obterMes(lanc.mes)}</td>
                <td>
                    <SelectMenu id="inputStatus" className="form-control" lista={listStatus}
                        value={lanc.status} name='mes' onChange={e => props.changeAction(lanc, e.target.value)}
                        disabled={lanc.status !== "PENDENTE"} />
                </td>
                <td>
                    <button type="button" title="Editar" className="btn btn-info"
                        onClick={e => props.editAction(lanc.id)} disabled={lanc.status !== "PENDENTE"}>
                        <i className="pi pi-pencil" ></i>
                    </button>
                    <button type="button" title="Excluir" className="btn btn-danger"
                        onClick={e => props.deleteAction(lanc)} disabled={lanc.status !== "PENDENTE"} >
                        <i className="pi pi-trash" title="Excluir"></i></button>
                </td>
            </tr>
        )
    })

    return (
        <table className="table table-hover mt-5">
            <thead>
                <tr className="text-center">
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col" style={{ width: '15%' }} >Situação</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}