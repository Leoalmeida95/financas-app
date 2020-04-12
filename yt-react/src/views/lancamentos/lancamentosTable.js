import React from 'react';
import currencyFormatter from 'currency-formatter';

export default props => {

    var rows = props.lancamentos.map(lanc => {
        return (
            <tr className="table-secondary" key={lanc.id}>
                <td>{lanc.descricao}</td>
                <td>{currencyFormatter.format(lanc.valor, { locale: 'pt-br' })}</td>
                <td>{lanc.tipo}</td>
                <td>{lanc.mes}</td>
                <td>{lanc.status}</td>
                <td>
                    <button type="button" className="btn btn-info" onClick={ e=> props.editAction(lanc.id)} >Editar</button>     
                    <button type="button" className="btn btn-danger" onClick={ e=> props.deleteAction(lanc)} >Deletar</button>              
                    </td>
            </tr>
        )
    })

    return (
        <table className="table table-hover mt-5">
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}