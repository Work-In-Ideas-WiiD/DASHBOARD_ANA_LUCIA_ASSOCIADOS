export interface IPostUserData {
    type: "cliente" | "empresa",
    email: string,
    cpf: string | null,
    nome: string,
    contato: string,
    cnpj?: null | string,
    nome_empresa?: null | string,
    endereco: {
        cep: string,
        rua: string,
        bairro: string,
        cidade: string,
        estado: string,
    }
}

export interface IGetUserListRes {
    current_page: number,
    data: IUserReqProps[],
    from: number,
    last_page: number,
    per_page: number,
    to: number,
    total: number,
}

export interface IUserReqProps {
    id: string,
    nome: string,
    email: string,
    email_verified_at: null | string,
    type: string,
    cpf: null | string,
    contato: null | string,
    cnpj: null | string,
    nome_empresa: null | string,
    clicksign_key: null | string,
    endereco_id: null | string,
    endereco: null | string,
}