import { AxiosResponse } from "axios";
import { IGetUserListRes, IPostUserData } from "./user.dto";
import { api } from "../api";

export async function postUserStore(data: IPostUserData): Promise<AxiosResponse<any, any>> {
    const res = await api.post("/user", data);

    return res;
}

export async function getUsersList(page: number = 1): Promise<AxiosResponse<IGetUserListRes, any>> {

    const res = await api.get(`/user?page=${page}`);

    return res;
}