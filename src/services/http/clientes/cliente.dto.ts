export interface IPostClienteModel {
    type: "cliente" | "empresa" | "administrador",
    email?: string,
    cpf?: string | null,
    nome: string,
    contato: string,
    cnpj?: null | string,
    nome_empresa?: null | string,
    endereco?: {
        cep: string,
        rua: string,
        bairro: string,
        cidade: string,
        estado: string,
        complemento?: string
    }
}

export interface IGetClientesRes {
    current_page: number,
    data: IGetClientesDataRes[],
    from: number,
    last_page: number,
    per_page: number,
    to: number,
    total: number,
}

export interface IGetClientesDataRes {
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

export interface IGetClickSignKeyRes {
    key: string
}

export interface IGetClienteRes {
    id: string,
    nome: string,
    email: string,
    cpf: string,
    contato: string,
    cnpj: string,
    nome_empresa: string,
    endereco: {
        id: string,
        cep: string,
        rua: string,
        numero: number,
        bairro: string,
        complemento: string,
        cidade: string,
        estado: string,
    }
}