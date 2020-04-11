import React from 'react';

export default (props) => {

    var options = props.lista.map( (option, index) => {
        return (
            <option key={index} value={option.value}>{option.label}</option>
        )
    });
    
    //o '...pros' passa o restante dos parametros para o componente
    return (
        <select {...props}>
            {options}
        </select>
    )
}