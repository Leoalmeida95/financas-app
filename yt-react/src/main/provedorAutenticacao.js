import React from 'react';
import AuthService from '../app/service/authService';

export const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;
const AuthProvider = AuthContext.Provider;

class ProvedorAutenticacao extends React.Component{

    state = {
        usuarioAutenticado: null,
        isAutenticado: false
    }

    encerrarSessao = () =>{
        AuthService.removerUsuarioAutenticado();
        this.setState({isAutenticado: false, usuarioAutenticado: null});
    }

    iniciarSessao = (usuario)=>{
        AuthService.logar(usuario);
        this.setState({isAutenticado: true, usuarioAutenticado: usuario});
    }

    render(){

       const {
            usuarioAutenticado,
            isAutenticado,
            iniciarSessao,
            encerrarSessao
        } = this.state;

        const contexto = {
            usuarioAutenticado,
            isAutenticado,
            iniciarSessao,
            encerrarSessao
        };

        return(
            <AuthProvider value={contexto}>
                {this.props.children}
            </AuthProvider>
        )
    }
}

export default ProvedorAutenticacao;