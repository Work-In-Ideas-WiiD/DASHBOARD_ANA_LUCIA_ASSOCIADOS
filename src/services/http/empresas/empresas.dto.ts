export interface IPostEmpresaModel {
    type: "cliente" | "empresa" | "administrador",
    email: string,
    cpf?: string | null,
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


export interface IGetEmpresasRes {
    current_page: number,
    data: IGetEmpresasDataRes[],
    from: number,
    last_page: number,
    per_page: number,
    to: number,
    total: number,
}

export interface IGetEmpresasDataRes {
    id: string,
    nome: string,
    email: string,
    cpf: string | null,
    contato: string | null,
    cnpj: string | null,
    nome_empresa: string | null,
}