import { AxiosError, AxiosResponse } from "axios";
import { api } from "../api";
import { IGetAdministradoresDataRes, IGetAdministradoresRes, IPostAdministradorModel, IPostAdministradorRes } from "./administradores.dto";

export async function getAdministradores(page: number = 1, like: string = ""): Promise<AxiosResponse<IGetAdministradoresRes, AxiosError>> {

    const res = await api.get(`/user?type=administrador`, {
        params: {
            like: like,
            page: page
        }
    });

    return res;
}

export async function getAdministrador(id: string): Promise<AxiosResponse<IGetAdministradoresDataRes, AxiosError>> {

    const res = await api.get(`/user/${id}`);

    return res;
}

export async function postAdministrador(model: IPostAdministradorModel): Promise<AxiosResponse<IPostAdministradorRes, AxiosError>> {
    const res = await api.post("/user", model);

    return res;
}