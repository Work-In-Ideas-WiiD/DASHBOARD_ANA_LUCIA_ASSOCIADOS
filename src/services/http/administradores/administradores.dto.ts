export interface IGetAdministradoresRes {
    current_page: number,
    data: IGetAdministradoresDataRes[],
    from: number,
    last_page: number,
    per_page: number,
    to: number,
    total: number,
}

export interface IGetAdministradoresDataRes {
    id: string,
    cnpj: null | string,
    contato: null | string,
    cpf: null | string,
    email: string,
    nome: string,
    nome_empresa: string | null,
}

export interface IPostAdministradorModel {
    type: "administrador",
    email: string,
    cpf: string,
    nome: string,
    contato: string,
}

export interface IPostAdministradorRes {
    id: string,
    nome: string,
    email: string,
    cpf: string,
    contato: null | string,
    cnpj: null | string,
    nome_empresa: null | string,
}