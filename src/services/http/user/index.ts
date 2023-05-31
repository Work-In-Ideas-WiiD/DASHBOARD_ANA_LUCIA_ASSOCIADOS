import { AxiosResponse } from "axios";
import { IGetUserListRes, IPostUserData } from "./user.dto";
import { api, setToken } from "../api";

export async function postUserStore(token: string, data: IPostUserData): Promise<AxiosResponse<any, any>> {
    setToken(token);
    const res = await api.post("/user", data);

    return res;
}

export async function getUsersList(token: string, page: number = 1): Promise<AxiosResponse<IGetUserListRes, any>> {
    setToken(token);

    const res = await api.get(`/user?page=${page}`);

    return res;
}