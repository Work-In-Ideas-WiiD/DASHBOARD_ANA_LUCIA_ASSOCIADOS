import { AxiosError, AxiosResponse } from "axios";
import { api } from "../api";
import { IGetContratosRes, IPostContratoRes } from "./contratos.dto";

export async function getContratos(page: number = 1, like: string = ""): Promise<AxiosResponse<IGetContratosRes, AxiosError>> {
    const res = await api.get('/contrato', {
        params: {
            like: like,
            page: page
        }
    });

    return res;
}

export async function postContrato(formData: FormData): Promise<AxiosResponse<IPostContratoRes, AxiosError>> {
    const res = await api.post("/contrato", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return res;
}