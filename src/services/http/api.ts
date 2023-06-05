import axios, { AxiosError } from 'axios';
import { signOut } from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const controller = new AbortController();

const api = axios.create({
    baseURL: 'https://sandbox.analucia.garen.wiid.com.br/api',
    signal: controller.signal
});

function setAuthToken(token: string) {
    api.defaults.headers.common['Authorization'] = "Bearer" + token;
}

function abortRequest() {
    controller.abort();
}

api.interceptors.response.use(response => {
    return response
}, (error: AxiosError) => {
    console.log(error.status);

    if (error.status === 401) {
        toast.error("Sessão expirada");
        signOut();
    }

    return Promise.reject(error);
})

export { api, abortRequest, setAuthToken };

// {
//     "message": "The given data was invalid.",
//         "errors": {
//         "type": [
//             "The selected type is invalid."
//         ],
//             "cpf": [
//                 "CPF inválido"
//             ]
//     }
// }