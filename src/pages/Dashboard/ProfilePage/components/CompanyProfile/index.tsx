import { CustomInputMask } from '../../../../../components/inputs/customInputMask';
import { InputText } from '../../../../../components/inputs/inputText';
import styles from './styles.module.scss';
import { CustomButton } from '../../../../../components/customButton';

import * as zod from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { PageTitle } from '../../../../../components/pageTitle';

import { useAuth } from '../../../../../hooks/useAuth';
import { toast } from 'react-toastify';
import { IPostClienteModel } from '../../../../../services/http/clientes/cliente.dto';
import axios from 'axios';
import { useEffect } from 'react';
import { getEmpresa, patchEmpresaStore } from '../../../../../services/http/empresas';


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

export function CompanyProfile() {
    const { handleFetching, fetching, me, refreshUserData } = useAuth();
    const navigate = useNavigate();
    const { handleSubmit, formState: { errors }, control, reset } = useForm<TFormSchema>({
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
        setUserData();
    }, []);

    function setUserData() {

        reset({
            nome: me.nome,
            cpf: me.cpf ? me.cpf : undefined,
            nome_empresa: me.nome_empresa ? me.nome_empresa : undefined,
            cnpj: me.cnpj ? me.cnpj : undefined,
            email: me.email,
            contato: me.contato!,
            endereco: me.endereco.rua ? me.endereco.rua : undefined,
            numero: me.endereco.numero ? String(me.endereco.numero) : undefined,
            bairro: me.endereco.bairro ? me.endereco.bairro : undefined,
            cidade: me.endereco.cidade ? me.endereco.cidade : undefined,
            estado: me.endereco.estado ? me.endereco.estado : undefined,
            complemento: me.endereco.complemento ? me.endereco.complemento : undefined,
            cep: me.endereco.cep ? me.endereco.cep : undefined
        });
    }

    async function handleCreate(_data: TFormSchema) {
        if (fetching) {
            return
        }
        try {
            handleFetching(true);
            const model: IPostClienteModel = {
                type: 'cliente',
                nome: _data.nome,
                nome_empresa: _data.nome_empresa,
                cpf: _data.cpf,
                contato: _data.contato,
                cnpj: _data.cnpj,
                endereco: {
                    bairro: _data.bairro,
                    cep: _data.cep,
                    cidade: _data.cidade,
                    estado: _data.estado,
                    rua: _data.endereco,
                    complemento: _data.complemento
                }
            }
            const id = me.id;
            await patchEmpresaStore(model, id);
            await refreshUserData();
            handleFetching(false);
            toast.success("Empresa editada.");
            setTimeout(() => {
                goBack();
            }, 2000);

        } catch (error) {
            console.log(error);
            handleFetching(false);
            if (axios.isAxiosError(error)) {
                if (error.response?.data.message) {
                    return toast.error(error.response?.data.message);
                }
                toast.error("Erro ao editar");
            }
            toast.error("Erro ao editar");
        }
    }

    function goBack() {
        navigate("/dashboard/home");
    }

    return (
        <section className={styles.new_contract}>
            <PageTitle
                backFunction={goBack}
                title='PERFIL'
                showBackButton={true}
            />

            <div className={styles.form_wrapper}>
                <form
                    onSubmit={handleSubmit(handleCreate)}
                    autoComplete="off"
                    autoCapitalize="off"
                >
                    <div className={styles.input_container}>
                        <InputText
                            control={control}
                            fieldName='nome'
                            title='Nome'
                            containerClass={styles.w75}
                            errors={errors}
                        />
                        <CustomInputMask
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
                            control={control}
                            fieldName='nome_empresa'
                            title='Nome da empresa'
                            containerClass={styles.w75}
                            errors={errors}
                        />
                        <CustomInputMask
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
                            fieldName='endereco'
                            control={control}
                            title='Endereço'
                            containerClass={styles.w77}
                            errors={errors}
                        />
                        <InputText
                            control={control}
                            fieldName='numero'
                            title='Número'
                            containerClass={styles.w18}
                            errors={errors}
                        />
                    </div>
                    <div className={styles.input_container}>
                        <InputText
                            control={control}
                            fieldName='bairro'
                            title='Bairro'
                            containerClass={styles.w44}
                            errors={errors}
                        />
                        <InputText
                            control={control}
                            fieldName='cidade'
                            title='Cidade'
                            containerClass={styles.w29}
                            errors={errors}
                        />
                        <InputText
                            control={control}
                            fieldName='estado'
                            title='Estado'
                            containerClass={styles.w26}
                            errors={errors}
                        />
                    </div>
                    <div className={styles.input_container}>
                        <InputText
                            fieldName='complemento'
                            control={control}
                            title='Complemento'
                            containerClass={styles.w70}
                            errors={errors}
                        />
                        <CustomInputMask
                            control={control}
                            fieldName='cep'
                            mask="99999-999"
                            title='CEP'
                            errors={errors}
                        />
                    </div>
                    <div className={styles.btn_container}>
                        <CustomButton
                            variation='3'
                            title='Salvar'
                            type='submit'
                        />
                    </div>
                </form>
            </div>
        </section>
    )
}