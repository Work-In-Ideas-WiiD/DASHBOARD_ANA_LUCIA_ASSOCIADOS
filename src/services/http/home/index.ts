import { AxiosResponse } from "axios";
import { api } from "../api";
import { IGetHomeContratosRes, IGetStatsRes } from "./home.dto";

export async function getStats(): Promise<AxiosResponse<IGetStatsRes, any>> {

    const res = await api.get(`/home/stats`);

    return res;
}

export async function getHomeContratos(): Promise<AxiosResponse<IGetHomeContratosRes[], any>> {

    const res = await api.get(`/home/contratos`);

    return res;
}