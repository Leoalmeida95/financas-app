import React from 'react';

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom';
import Login from '../views/login';
import CadastroUsuario from '../views/cadastroUsuario';
import Home from '../views/home';
import Lancamentos from '../views/lancamentos/lancamentos';
import cadastroLancamento from '../views/lancamentos/cadastroLancamento';
import { AuthConsumer } from '../main/provedorAutenticacao';

function RotaAutenticada({ component: Component, isUsuarioAutenticado, ...props }) {
    return (
        <Route {...props} render={(componentProps) => {
            if (isUsuarioAutenticado) {
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

function Rotas(props) {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/lancamentos" component={Lancamentos} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-lancamentos/:id?" component={cadastroLancamento} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/" component={Home} />
            </Switch>
        </HashRouter>
    )
}

export default () => (
    <AuthConsumer>
        {
            (context) => (<Rotas isUsuarioAutenticado={context.isAutenticado} />)
        }
    </AuthConsumer>
);