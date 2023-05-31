import axios from 'axios';

const controller = new AbortController();

const api = axios.create({
    baseURL: 'https://sandbox.analucia.garen.wiid.com.br/api',
    signal: controller.signal
});

function setToken(token: string) {
    api.defaults.headers.common['Authorization'] = "Bearer" + token;
}

function abortRequest() {
    controller.abort();
}

export { api, setToken, abortRequest };