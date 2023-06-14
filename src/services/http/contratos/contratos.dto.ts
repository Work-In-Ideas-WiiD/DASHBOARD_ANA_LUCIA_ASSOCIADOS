export interface IGetContratosRes {
    current_page: number,
    data: IGetContratosDataRes[],
    from: number,
    last_page: number,
    per_page: number,
    to: number,
    total: number,
}

export interface IGetContratosDataRes {
    id: string,
    descricao: string,
    path: string,
    status: string,
    created_at: string,
    updated_at: string,
    url: string,
    empresa: {
        id: string,
        nome: string,
        email: string,
        cpf: null | string,
        contato: null | string,
        cnpj: null | string,
        nome_empresa: null | string,
        created_at: string,
        updated_at: string,
    } | null,
    assinantes: {
        has_signed: boolean,
        cliente: {
            id: string,
            nome: string,
            email: string,
            cpf: string,
            contato: string,
            cnpj: null | string,
            nome_empresa: null | string,
            created_at: string,
            updated_at: string,
        }
    }[]

}

export interface IPostContratoRes {
    path: string,
    descricao: string,
    id: string,
    url: string,
}