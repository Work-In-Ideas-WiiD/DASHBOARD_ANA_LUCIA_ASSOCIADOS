import { AxiosError, AxiosResponse } from "axios";
import { api } from "../api";
import { IGetClickSignKeyRes, IGetClientesDataRes, IGetClientesRes, IPostClienteModel } from "./cliente.dto";

export async function getCliente(id: string): Promise<AxiosResponse<IGetClientesDataRes, any>> {

    const res = await api.get(`/cliente/${id}`);

    return res;
}

export async function getClientes(page: number = 1, like: string = ""): Promise<AxiosResponse<IGetClientesRes, any>> {

    const res = await api.get(`/cliente`, {
        params: {
            like: like,
            page: page
        }
    });

    return res;
}

export async function postClienteStore(data: IPostClienteModel): Promise<AxiosResponse<any, AxiosError>> {
    const res = await api.post("/cliente", data);

    return res;
}

export async function getClickSignKey(id: string): Promise<AxiosResponse<IGetClickSignKeyRes, AxiosError>> {
    const res = await api.get(`/cliente/buscar/key/${id}`);

    return res;
}
