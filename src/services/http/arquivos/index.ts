import { AxiosError, AxiosResponse } from "axios";
import { api } from "../api";

export async function getArquivos(page: number = 1, like: string = ""): Promise<AxiosResponse<any, AxiosError>> {
    const res = await api.get(`/arquivo`, {
        params: {
            like: like,
            page: page
        }
    });

    return res;
}

export async function postArquivo(formData: FormData): Promise<AxiosResponse<any, AxiosError>> {
    const res = await api.post("/arquivo", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return res;
}