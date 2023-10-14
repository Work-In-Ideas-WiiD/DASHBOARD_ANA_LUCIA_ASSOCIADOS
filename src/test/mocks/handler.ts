import { rest } from "msw";

const baseUrl = 'https://sandbox.analucia.garen.wiid.com.br/api';

export const handler = [
    rest.get(`${baseUrl}/me`, (req, res, ctx) => {
        return res(ctx.status(200),
            ctx.json({
                "id": "3dcc8d17-49cf-4bdc-917e-359dfcda5b02",
                "nome": "Wanderson Costa",
                "email": "wcostaprijo@hotmail.com",
                "type": "administrador",
                "cpf": null,
                "contato": null,
                "cnpj": null,
                "nome_empresa": null,
                "endereco_id": null,
                "created_at": "2023-06-28T16:40:21.000000Z",
                "updated_at": "2023-06-28T16:40:21.000000Z",
                "empresa_id": null,
                "endereco": null
            }))
    }),
    rest.get(`${baseUrl}/auth/login`, (req, res, ctx) => {
        return res(ctx.status(200),
            ctx.json({
                'access_token': "xxxxxxxxxxxxxxxxxxxxxxxx"
            }))
    })
]