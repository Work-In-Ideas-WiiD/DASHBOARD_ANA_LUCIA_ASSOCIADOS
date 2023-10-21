import styles from './styles.module.scss';
import * as zod from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputText } from '../../../../components/inputs/inputText';
import { CustomInputMask } from '../../../../components/inputs/customInputMask';
import { CustomButton } from '../../../../components/customButton';
import { PageTitle } from '../../../../components/pageTitle';
import { useNavigate, useParams } from 'react-router-dom';
import { getAdministrador, patchAdministrador } from '../../../../services/http/administradores';
import { IPostAdministradorModel } from '../../../../services/http/administradores/administradores.dto';
import { useAuth } from '../../../../hooks/useAuth';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const formSchema = zod.object({
    nome: zod.string({
        required_error: "Campo obrigatório",
    }),
    cpf: zod.string({
        required_error: "Campo obrigatório",
    }),
    contato: zod.string({
        required_error: "Campo obrigatório",
    }),
    email: zod.string().optional()
});

type TFormSchema = zod.infer<typeof formSchema>;

export function EditAdmin() {
    const params = useParams();
    const { handleFetching, fetching } = useAuth();
    const navigate = useNavigate();
    const { handleSubmit, formState: { errors }, control, reset } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: undefined,
            cpf: undefined,
            contato: undefined,
            email: undefined,
        }
    })

    useEffect(() => {
        const id = params.id as string;
        getData(id);
    }, [])

    async function getData(id: string) {
        const { data } = await getAdministrador(id);
        reset({
            nome: data.nome,
            cpf: data.cpf ? data.cpf : undefined,
            contato: data.contato ? data.contato : undefined,
            email: data.email,
        });
    }

    async function handleEdit(data: TFormSchema) {
        if (fetching) {
            return
        }
        try {
            handleFetching(true);
            const model: IPostAdministradorModel = {
                nome: data.nome,
                cpf: data.cpf,
                contato: data.contato,
            }
            await patchAdministrador(model, params.id as string);
            handleFetching(false);
            toast.success("Administrador editado");
            setTimeout(() => {
                goBack();
            }, 3000);
        } catch (err) {
            toast.error("Erro ao editar administrador")
            handleFetching(false);
            console.log(err);
        }

    }

    function goBack() {
        navigate("/dashboard/admins");
    }

    return (
        <section className={styles.new_contract}>
            <PageTitle
                backFunction={goBack}
                title='EDITAR ADMINISTRADOR'
                showBackButton={true}
            />
            <div className={styles.form_wrapper}>
                <form onSubmit={handleSubmit(handleEdit)}>
                    <InputText
                        control={control}
                        fieldName='nome'
                        title='Nome do administrador'
                        type='text'
                        errors={errors}
                    />
                    <InputText
                        disabled
                        control={control}
                        fieldName='email'
                        title='E-mail'
                        type='text'
                        errors={errors}
                    />
                    <CustomInputMask
                        control={control}
                        fieldName='contato'
                        title='Contato'
                        type='text'
                        mask='(99)9 9999-9999'
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
                    <div className={styles.btn_container}>
                        <CustomButton
                            title='Adicionar administrador'
                            variation='2'
                        />
                    </div>
                </form>
            </div>
        </section>
    )
}