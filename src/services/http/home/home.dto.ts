

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
    created_at: string,
    updated_at: string,
    url: string,
    assinantes: {
        has_signed: boolean,
        tipo: "empresa" | "cliente",
        dados: {
            nome: string,
            email: string,
            documento: string,
            contato: string,
        }
    }[]
}