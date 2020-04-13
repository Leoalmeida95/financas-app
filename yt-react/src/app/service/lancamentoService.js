import ApiService from '../apiservice';
import ErroValidacao from '../exception/erroValdiacao';

export default class LancamentoService extends ApiService {
    constructor() {
        super('/api/lancamentos');
        this.meses = [
            { label: 'Selecione...', value: '' },
            { label: 'Janeiro', value: '1' },
            { label: 'Fevereiro', value: '2' },
            { label: 'Março', value: '3' },
            { label: 'Abril', value: '4' },
            { label: 'Maio', value: '5' },
            { label: 'Junho', value: '6' },
            { label: 'Julho', value: '7' },
            { label: 'Agosto', value: '8' },
            { label: 'Setembro', value: '9' },
            { label: 'Outubro', value: '10' },
            { label: 'Novembro', value: '11' },
            { label: 'Dezembro', value: '12' }
        ];    
    }

    obterListaMeses() {
        return this.meses;
    }

    obterMes(valor){
        var mes = this.meses.find(x=> x.value.toString() === valor.toString());
        return mes.label;
    }

    obterTipos() {
        return [
            { label: 'Selecione...', value: '' },
            { label: 'Despesa', value: 'DESPESA' },
            { label: 'Receita', value: 'RECEITA' }
        ];
    }

    obterStatus() {
        return [
            { label: 'Pendente', value: "PENDENTE" },
            { label: 'Efetivado', value: "EFETIVADO" },
            { label: 'Cancelado', value: "CANCELADO" }
        ];
    }

    consultar(LancamentoFiltro) {
        let params = `?ano=${LancamentoFiltro.ano}`;

        if (LancamentoFiltro.mes) {
            params = `${params}&mes=${LancamentoFiltro.mes}`;
        }

        if (LancamentoFiltro.tipo) {
            params = `${params}&tipo=${LancamentoFiltro.tipo}`;
        }

        if (LancamentoFiltro.status) {
            params = `${params}&status=${LancamentoFiltro.status}`;
        }

        if (LancamentoFiltro.usuario) {
            params = `${params}&usuario=${LancamentoFiltro.usuario}`;
        }

        if (LancamentoFiltro.descricao) {
            params = `${params}&descricao=${LancamentoFiltro.descricao}`;
        }

        return this.get(params);
    }

    deletar(id) {
        return this.delete(`/${id}`);
    }

    salvar(lancamento) {
        return this.post('/', lancamento);
    }

    obterPorId(id) {
        return this.get(`/${id}`);
    }

    atualizar(lancamento) {
        return this.put(`/${lancamento.id}`, lancamento);
    }

    validarLancamento(lancamento) {
        const erros = [];

        if (!lancamento.ano)
            erros.push("Inform o Ano.");
        else if (lancamento.ano.length !== 4)
            erros.push("O Ano deve ter 4 dígitos.");

        if (!lancamento.descricao)
            erros.push("Inform o Descrição.");

        if (!lancamento.mes)
            erros.push("Inform o Mês.");

        if (!lancamento.tipo)
            erros.push("Inform o Tipo.");

        if (!lancamento.valor)
            erros.push("Inform o Valor.");

        if (erros && erros.length) {
            throw new ErroValidacao(erros);
        }
    }

    validarConsulta(ano){
        const erros = [];

        if (!ano)
            erros.push("Inform o Ano.");
        else if (ano.length !== 4)
            erros.push("O Ano deve ter 4 dígitos.");

        if (erros && erros.length) {
            throw new ErroValidacao(erros);
        }
    }

    alterarStatus(id, status){
        return this.put(`/${id}/atualizar-status`, {status})
    }
}