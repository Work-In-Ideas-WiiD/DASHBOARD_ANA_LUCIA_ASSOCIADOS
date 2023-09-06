export interface IGetArquivosRes {
    current_page: number,
    data: IGetArquivosDataRes[],
    from: number,
    last_page: number,
    per_page: number,
    to: number,
    total: number,
}


export interface IGetArquivosDataRes {
    id: string,
    descricao: string,
    empresas?: {
        empresa: {
            id: string,
            nome: string,
            email: string,
            contato: string,
            cnpj: string,
            nome_empresa: string,
            created_at: string,
            updated_at: string,
        }
    }[]
    path: string,
    status: "pendente" | "assinado",
    created_at: string,
    updated_at: string,
    url: string,
}