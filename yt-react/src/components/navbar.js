import React from 'react';
import NavbarItem from './navbaritem';
import { AuthConsumer } from '../main/provedorAutenticacao';

function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <a className="navbar-brand" href="#/home">Minhas Finanças</a>
            <button className="navbar-toggler" type="button"
                data-toggle="collapse" data-target="#navbarColor03"
                aria-controls="navbarColor03" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor03">
                <ul className="navbar-nav mr-auto">
                    <NavbarItem render={props.isUsuarioAutenticado} label="Início" href="#/home" />
                    <NavbarItem render={props.isUsuarioAutenticado}  label="Lançamentos" href="#/lancamentos" />
                </ul>
            </div>
            <div className="text-white">
                {
                    props.isUsuarioAutenticado ?
                        (
                            <div>
                                <div className="collapse navbar-collapse" id="navbarColor03">
                                 Olá, {props.usuarioNome}! Como estão as finanças?
                                    <ul className="navbar-nav mr-auto">
                                        <NavbarItem render={props.isUsuarioAutenticado}  onClick={props.deslogar} label="Sair" href="#/login" />
                                    </ul>
                                </div>
                            </div>
                        )
                        :
                        (
                            <>
                            </>
                        )
                }

            </div>
        </nav>
    )
}

export default () => (
    <AuthConsumer>
        {
            (context) => (
                <Navbar isUsuarioAutenticado={context.isAutenticado} deslogar={context.encerrarSessao}
                usuarioNome={context.usuarioAutenticado !== null ? context.usuarioAutenticado.nome : ""} />
            )
        }
    </AuthConsumer>
)