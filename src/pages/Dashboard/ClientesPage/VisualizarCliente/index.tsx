import { CustomInputMask } from '../../../../components/inputs/customInputMask';
import { InputText } from '../../../../components/inputs/inputText';
import styles from './styles.module.scss';

import * as zod from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { PageTitle } from '../../../../components/pageTitle';

import { getCliente } from '../../../../services/http/clientes';
import { useEffect } from 'react';

const formSchema = zod.object({
    nome: zod.string({
        required_error: "Campo obrigatório",
    }),
    cpf: zod.string({}).optional(),
    nome_empresa: zod.string({}).optional(),
    cnpj: zod.string({}).optional(),
    email: zod.string({
        required_error: "Campo obrigatório",
    }).email({
        message: "E-mail inválido"
    }),
    contato: zod.string({
        required_error: "Campo obrigatório",
    }),
    endereco: zod.string({
        required_error: "Campo obrigatório",
    }),
    numero: zod.string({
        required_error: "Campo obrigatório",
    }),
    bairro: zod.string({
        required_error: "Campo obrigatório",
    }),
    cidade: zod.string({
        required_error: "Campo obrigatório",
    }),
    estado: zod.string({
        required_error: "Campo obrigatório",
    }),
    complemento: zod.string({
        required_error: "Campo obrigatório",
    }),
    cep: zod.string({
        required_error: "Campo obrigatório",
    }),
}).superRefine((val, ctx) => {

    if (!val.cnpj && val.nome_empresa) {
        ctx.addIssue({
            message: "Informe o CNPJ da empresa",
            path: ["cnpj"],
            code: 'custom'
        });
        return zod.NEVER;
    }

    if (val.cnpj && !val.nome_empresa) {
        ctx.addIssue({
            message: "Informe o nome da empresa",
            path: ["nome_empresa"],
            code: 'custom'
        });
        return zod.NEVER;
    }

    if (!val.cpf && !val.cnpj) {
        ctx.addIssue({
            message: "Informe CPF ou CNPJ",
            path: ["cpf"],
            code: 'custom'
        });
        ctx.addIssue({
            message: "Informe CPF ou CNPJ",
            path: ["cnpj"],
            code: 'custom'
        });
    }
})

type TFormSchema = zod.infer<typeof formSchema>;

export function ShowCustomerInfo() {
    const params = useParams();
    const navigate = useNavigate();
    const { formState: { errors }, control, reset } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: undefined,
            cpf: undefined,
            nome_empresa: undefined,
            cnpj: undefined,
            email: undefined,
            contato: undefined,
            endereco: undefined,
            numero: undefined,
            bairro: undefined,
            cidade: undefined,
            estado: undefined,
            complemento: undefined,
            cep: undefined,
        }
    })

    useEffect(() => {
        const id = params.id as string;
        getData(id);
    }, []);

    async function getData(id: string) {
        const { data } = await getCliente(id);
        reset({
            nome: data.nome,
            cpf: data.cpf ? data.cpf : undefined,
            nome_empresa: data.nome_empresa ? data.nome_empresa : undefined,
            cnpj: data.cnpj ? data.cnpj : undefined,
            email: data.email,
            contato: data.contato!,
            endereco: data.endereco.rua,
            numero: String(data.endereco.numero),
            bairro: data.endereco.bairro,
            cidade: data.endereco.cidade,
            estado: data.endereco.estado,
            complemento: data.endereco.complemento ? data.endereco.complemento : undefined,
            cep: data.endereco.cep
        });
    }


    function goBack() {
        navigate("/dashboard/clientes");
    }

    return (
        <section className={styles.new_contract}>
            <PageTitle
                backFunction={goBack}
                title='CLIENTE'
                showBackButton={true}
            />

            <div className={styles.form_wrapper}>
                <form
                    autoComplete="off"
                    autoCapitalize="off"
                >
                    <div className={styles.input_container}>
                        <InputText
                            disabled
                            control={control}
                            fieldName='nome'
                            title='Nome'
                            containerClass={styles.w75}
                            errors={errors}
                        />
                        <CustomInputMask
                            disabled
                            fieldName='cpf'
                            control={control}
                            title='CPF'
                            containerClass={styles.w25}
                            mask='999.999.999-99'
                            errors={errors}
                        />
                    </div>
                    <div className={styles.input_container}>
                        <InputText
                            disabled
                            control={control}
                            fieldName='nome_empresa'
                            title='Nome da empresa'
                            containerClass={styles.w75}
                            errors={errors}
                        />
                        <CustomInputMask
                            disabled
                            control={control}
                            fieldName='cnpj'
                            title='CNPJ'
                            containerClass={styles.w25}
                            mask='99.999.999/9999-99'
                            errors={errors}
                        />
                    </div>
                    <div className={styles.input_container}>
                        <InputText
                            disabled
                            fieldName='email'
                            control={control}
                            title='E-mail'
                            containerClass={styles.w63}
                            errors={errors}
                        />
                        <CustomInputMask
                            disabled
                            control={control}
                            fieldName='contato'
                            title='Celular'
                            containerClass={styles.w36}
                            mask='(99) 99999-9999'
                            errors={errors}
                        />
                    </div>
                    <div className={styles.input_container}>
                        <InputText
                            disabled
                            fieldName='endereco'
                            control={control}
                            title='Endereço'
                            containerClass={styles.w77}
                            errors={errors}
                        />
                        <InputText
                            disabled
                            control={control}
                            fieldName='numero'
                            title='Número'
                            containerClass={styles.w18}
                            errors={errors}
                        />
                    </div>
                    <div className={styles.input_container}>
                        <InputText
                            disabled
                            control={control}
                            fieldName='bairro'
                            title='Bairro'
                            containerClass={styles.w44}
                            errors={errors}
                        />
                        <InputText
                            disabled
                            control={control}
                            fieldName='cidade'
                            title='Cidade'
                            containerClass={styles.w29}
                            errors={errors}
                        />
                        <InputText
                            disabled
                            control={control}
                            fieldName='estado'
                            title='Estado'
                            containerClass={styles.w26}
                            errors={errors}
                        />
                    </div>
                    <div className={styles.input_container}>
                        <InputText
                            disabled
                            fieldName='complemento'
                            control={control}
                            title='Complemento'
                            containerClass={styles.w70}
                            errors={errors}
                        />
                        <CustomInputMask
                            disabled
                            control={control}
                            fieldName='cep'
                            mask="99999-999"
                            title='CEP'
                            errors={errors}
                        />
                    </div>
                </form>
            </div>
        </section>
    )
}