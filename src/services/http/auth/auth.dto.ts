export interface IPostLoginRes {
    access_token: string,
    token_type: string,
    expires_in: number
}
export type TUserTypes = "empresa" | "administrador" | "cliente" | "";

export interface IUserProps {
    id: string
    nome: string
    email: string
    email_verified_at: null | string
    type: TUserTypes,
    cpf: null | string
    contato: null | string
    cnpj: null | string
    nome_empresa: null | string
    clicksign_key: null | string
    endereco_id: null | string
    deleted_at: null | string
    created_at: string
    updated_at: string
    endereco: {
        cep: string,
        rua: string,
        bairro: string,
        cidade: string,
        numero: string,
        estado: string,
        complemento?: string
    }
}