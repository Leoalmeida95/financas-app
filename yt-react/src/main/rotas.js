import React from 'react';

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom';
import Login from '../views/login';
import CadastroUsuario from '../views/cadastroUsuario';
import Home from '../views/home';
import Lancamentos from '../views/lancamentos/lancamentos';
import cadastroLancamento from '../views/lancamentos/cadastroLancamento';
import AuthService from '../app/service/authService';

function RotaAutenticada({ component: Component, ...props }) {
    return (
        <Route {...props} render={(componentProps) => {
            if (AuthService.usuarioAutenticado()) {
                return (
                    <Component {...componentProps} />
                )
            } else {
                return (
                    <Redirect to={{ pathname: '/login', state: { from: componentProps.location } }} />
                )
            }
        }} />
    )
}

function Rotas() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />
                <RotaAutenticada path="/home" component={Home} />
                <RotaAutenticada path="/lancamentos" component={Lancamentos} />
                <RotaAutenticada path="/cadastro-lancamentos/:id?" component={cadastroLancamento} />
                {/* <Route path="/" component={Home}/> */}
            </Switch>
        </HashRouter>
    )
}

export default Rotas;