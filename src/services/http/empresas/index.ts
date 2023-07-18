import { AxiosError, AxiosResponse } from "axios";
import { api } from "../api";
import { IGetEmpresasRes, IPatchEmpresaStoreModel, IPostEmpresaModel } from "./empresas.dto";

export async function getEmpresas(page: number = 1, like: string = ""): Promise<AxiosResponse<IGetEmpresasRes, AxiosError>> {

    const res = await api.get(`/user?type=empresa`, {
        params: {
            like: like,
            page: page
        }
    });

    return res;
}

export async function getEmpresaLogin(like: string = ""): Promise<AxiosResponse<IGetEmpresasRes, AxiosError>> {

    const res = await api.get(`/empresas`, {
        params: {
            like: like,
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

export async function patchEmpresaStore(data: IPostEmpresaModel, id: string): Promise<AxiosResponse<any, AxiosError>> {
    const res = await api.patch(`/user/${id}`, data);

    return res;
}

export async function delEmpresa(id: string): Promise<AxiosResponse<any, AxiosError>> {
    const res = await api.delete(`/user/${id}`);

    return res;
}