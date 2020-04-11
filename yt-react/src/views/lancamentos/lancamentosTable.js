import React from 'react';

export default props => {

    var rows = props.lancamentos.map(l => {
        return (
            <tr className="table-secondary" key={l.id}>
                <td>{l.descricao}</td>
                <td>{l.valor}</td>
                <td>{l.tipo}</td>
                <td>{l.mes}</td>
                <td>{l.status}</td>
                <td>

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