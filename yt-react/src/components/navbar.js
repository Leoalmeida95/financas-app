import React from 'react'
import NavbarItem from './navbaritem'

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <a className="navbar-brand" href="#">Minhas Finanças</a>
            <button className="navbar-toggler" type="button"
                data-toggle="collapse" data-target="#navbarColor03"
                aria-controls="navbarColor03" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor03">
                <ul className="navbar-nav mr-auto">
                    <NavbarItem label="Início" href="#/" />
                    <NavbarItem label="Usuários" href="#/cadastro-usuarios" />
                    <NavbarItem label="Lançamentos" href="#" />
                    <NavbarItem label="Login" href="#/login" />
                </ul>
            </div>
        </nav>
    )
}

export default Navbar