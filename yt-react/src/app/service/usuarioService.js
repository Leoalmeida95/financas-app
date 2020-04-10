import ApiService from '../apiservice';

class UsuarioService extends ApiService{
    constructor(){
        super('/api/usuarios');
    }

    autenticar(credencias){
        return this.post('/autenticar', credencias);
    }

    obterSaldoPorUsuario(id){
        return this.get(`/${id}/saldo`);//usando a crase pra transformar a url em um tamplateString
    }
}

export default UsuarioService;