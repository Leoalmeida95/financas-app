import ApiService from '../apiservice';
import ErroValidacao from '../exception/erroValdiacao';

class UsuarioService extends ApiService {
    constructor() {
        super('/api/usuarios');
    }

    autenticar(credencias) {
        return this.post('/autenticar', credencias);
    }

    obterSaldoPorUsuario(id) {
        return this.get(`/${id}/saldo`);//usando a crase pra transformar a url em um tamplateString
    }

    salvar(dadosCadastrais) {
        return this.post('/salvar', dadosCadastrais);
    }

    validarFormulario = (usuario) => {
        const erros = [];

        if (!usuario.nome)
            erros.push("O campo Nome é obrigatório.");

        if (!usuario.email)
            erros.push("O campo Email é obrigatório.");
        else if (!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/))
            erros.push("Informe um Emal válido.");

        if (!usuario.senha || !usuario.senhaRepeticao)
            erros.push("Informe a senha e a Confirmação.");
        else if (usuario.senha !== usuario.senhaRepeticao)
            erros.push("As senhas não coincidem.");
        else if (usuario.senha.length < 6)
            erros.push("A senha deve ter pelo menos 6 dígitos.");

        if (erros && erros.length) {
            throw new ErroValidacao(erros);
        }
    }
}

export default UsuarioService;