import { AxiosError, AxiosResponse } from "axios";
import { api } from "../api";
import { IGetEmpresasRes, IPostEmpresaModel } from "./empresas.dto";

export async function getEmpresas(page: number = 1, like: string = ""): Promise<AxiosResponse<IGetEmpresasRes, AxiosError>> {

    const res = await api.get(`/user?type=empresa`, {
        params: {
            like: like,
            page: page
        }
    });

    return res;
}

export async function getEmpresa(id: string): Promise<AxiosResponse<any, AxiosError>> {

    const res = await api.get(`/user/${id}`);

    return res;
}

export async function postEmpresaStore(data: IPostEmpresaModel): Promise<AxiosResponse<any, AxiosError>> {
    const res = await api.post("/user", data);

    return res;
}