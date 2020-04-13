import LocalStorageService from './localStorageService';

const USUARIO_LOGADO = '_usuario_logado';

export default class AuthService{

    static usuarioAutenticado(){
        const usuario = LocalStorageService.obterItem(USUARIO_LOGADO);
        return usuario && usuario.id;
    }

    static deslogar(){
        LocalStorageService.removerItem(USUARIO_LOGADO);
    }

    static logar(usuario){
        LocalStorageService.adicionarItem(USUARIO_LOGADO, usuario);
    }
}