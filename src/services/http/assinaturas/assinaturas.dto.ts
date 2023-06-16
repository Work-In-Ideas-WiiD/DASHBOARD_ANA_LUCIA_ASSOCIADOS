
export interface IGetAssinaturasRes {
    current_page: number,
    data: IGetAssinaturasData[],
    from: number,
    last_page: number,
    per_page: number,
    to: number,
    total: number,
}

export interface IGetAssinaturasData {
    id: string,
    descricao: string,
    path: string,
    status: string,
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