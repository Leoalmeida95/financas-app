import React from 'react';
import NavbarItem from './navbaritem';
import LocalStorageService from '../app/service/localStorageService';

function Navbar() {
    
    const nome = LocalStorageService.obterItem('_usuario_logado').nome;
    
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
                    <NavbarItem label="Início" href="#/home" />
                    <NavbarItem label="Lançamentos" href="#/lancamentos" />
                    <NavbarItem label="Login" href="#/login" />
                </ul>
            </div>
            <div className="text-white">
                Olá, {nome}! Como estão as finanças?
            </div>
        </nav>
    )
}

export default Navbar