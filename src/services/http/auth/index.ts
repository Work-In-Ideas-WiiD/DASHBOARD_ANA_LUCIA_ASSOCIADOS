import { AxiosResponse } from "axios";
import { api } from "../api";
import { IPostLoginRes, IPostRequestResetPasswordModel, IUserProps } from "./auth.dto";

export async function postMe(): Promise<AxiosResponse<IUserProps, any>> {
    const res = await api.post("/auth/me");

    return res;
}

export async function postLogin(email: string, password: string): Promise<AxiosResponse<IPostLoginRes, any>> {
    const res = await api.post("/auth/login", {
        email,
        password
    });

    return res;
}

export async function postLoginCustomer(email: string, password: string, companyId: string): Promise<AxiosResponse<IPostLoginRes, any>> {
    const res = await api.post("/auth/login", {
        email,
        password,
        empresa_id: companyId
    });

    return res;
}

export async function postLogout(): Promise<AxiosResponse<any, any>> {
    const res = await api.post("/auth/logout");

    return res;
}

export async function postResetPassword(
    token: string,
    id: string,
    password: string,
    password_confirmation: string
): Promise<AxiosResponse<any, any>> {
    const res = await api.post("/auth/reset/password", {
        token,
        id,
        password,
        password_confirmation
    });

    return res;
}

export async function postRequestResetPassword(
    model: IPostRequestResetPasswordModel,
): Promise<AxiosResponse<any, any>> {
    const res = await api.post("/auth/reset-password", model);

    return res;
}
export async function postFirstAcess(
    token: string,
    email: string,
    password: string,
    password_confirmation: string
): Promise<AxiosResponse<any, any>> {
    const res = await api.post("/auth/first/access", {
        token,
        email,
        password,
        password_confirmation
    });

    return res;
}
