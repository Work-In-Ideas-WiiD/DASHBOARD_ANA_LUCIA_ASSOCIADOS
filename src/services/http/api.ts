import axios from 'axios';

const api = axios.create({
    baseURL: 'https://sandbox.analucia.garen.wiid.com.br/api',
});

function setToken(token: string) {
    api.defaults.headers.common['Authorization'] = "Bearer" + token;
}

export { api, setToken };