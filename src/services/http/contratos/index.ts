import { AxiosResponse } from "axios";
import { api } from "../api";
import { IGetContratosRes } from "./contratos.dto";

export async function getContratos(page: number = 1, like: string = ""): Promise<AxiosResponse<IGetContratosRes, any>> {
    const res = await api.get('/contrato', {
        params: {
            like: like,
            page: page
        }
    });

    return res;
}