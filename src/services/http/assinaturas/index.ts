import { AxiosError, AxiosResponse } from "axios";
import { api } from "../api";

export async function getAssinatura(id: string): Promise<AxiosResponse<any, AxiosError>> {

    const res = await api.get(`/assinatura/${id}`);

    return res;
}

export async function getAssinaturas(page: number = 1, like: string = ""): Promise<AxiosResponse<any, AxiosError>> {

    const res = await api.get(`/assinatura`, {
        params: {
            like: like,
            page: page
        }
    });

    return res;
}