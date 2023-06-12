

export interface IGetStatsRes {
    empresas: string,
    contratos: string,
    assinaturas: string,
    clientes: string,
}

export interface IGetHomeContratosRes {
    id: string,
    descricao: string,
    path: string,
    status: "pendente" | "assinado",
    url: string,
    clientes: string[],
    updated_at: string,
    created_at: string,
}