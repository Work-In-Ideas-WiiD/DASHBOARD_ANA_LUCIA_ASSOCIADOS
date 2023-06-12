import styles from './styles.module.scss';
import * as zod from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputText } from '../../../../components/inputs/inputText';
import { CustomInputMask } from '../../../../components/inputs/customInputMask';
import { CustomButton } from '../../../../components/customButton';
import { PageTitle } from '../../../../components/pageTitle';
import { useNavigate } from 'react-router-dom';
import { postAdministrador } from '../../../../services/http/administradores';
import { IPostAdministradorModel } from '../../../../services/http/administradores/administradores.dto';
import { useAuth } from '../../../../hooks/useAuth';
import { toast } from 'react-toastify';

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
    email: zod.string({
        required_error: "Campo obrigatório",
    }).email({
        message: "E-mail inválido"
    })
});

type TFormSchema = zod.infer<typeof formSchema>;

export function NovoAdministrador() {
    const { handleFetching, fetching } = useAuth();
    const navigate = useNavigate();
    const { handleSubmit, formState: { errors }, control } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: undefined,
            cpf: undefined,
            contato: undefined,
            email: undefined,
        }
    })

    async function handleCreate(data: TFormSchema) {
        if (fetching) {
            return
        }
        try {
            handleFetching(true);
            const model: IPostAdministradorModel = {
                nome: data.nome,
                cpf: data.cpf,
                contato: data.contato,
                email: data.email,
                type: "administrador"
            }
            const res = await postAdministrador(model);
            handleFetching(false);
            toast.success("Administrador cadastrado");
            setTimeout(() => {
                goBack();
            }, 3000);
        } catch (err) {
            toast.error("Erro ao cadastrar administrador")
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
                title='NOVO CADASTRO'
                showBackButton={true}
            />
            <div className={styles.form_wrapper}>
                <form onSubmit={handleSubmit(handleCreate)}>
                    <InputText
                        control={control}
                        fieldName='nome'
                        title='Nome do administrador'
                        type='text'
                        errors={errors}
                    />
                    <InputText
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