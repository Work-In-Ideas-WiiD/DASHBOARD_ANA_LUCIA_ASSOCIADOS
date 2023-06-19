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
    path: string,
    status: "pendente" | "assinado",
    created_at: string,
    updated_at: string,
    url: string,
}