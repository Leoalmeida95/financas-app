class LocalStorageService{
    //a informacao do usuario poderia ser salva em coockie ou localStorage
    //O localStorage é acessado somente no front, enquanto o coockie é também no back

    static adicionarItem(chave,valor){
        localStorage.setItem(chave,
                            JSON.stringify(valor)//transforma o obj em string
                            );
    }

    static obterItem(chave){
        return JSON.parse(localStorage.getItem(chave));
    }

    static removerItem(chave){
        localStorage.removeItem(chave);
    }
}

export default LocalStorageService;