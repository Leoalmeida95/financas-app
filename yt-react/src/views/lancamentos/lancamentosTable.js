import React from 'react';

export default props => {
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
                <tr className={`table-${props.color}`}>
                    <td>Column content</td>
                    <td>Column content</td>
                    <td>Column content</td>
                    <td>Column content</td>
                    <td>Column content</td>
                    <td>Column content</td>
                </tr>
            </tbody>
        </table>
    )
}