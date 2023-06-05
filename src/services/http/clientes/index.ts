import { AxiosError, AxiosResponse } from "axios";
import { api } from "../api";
import { IGetClientesDataRes, IGetClientesRes, IPostClienteModel } from "./cliente.dto";

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