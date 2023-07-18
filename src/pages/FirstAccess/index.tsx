import styles from './styles.module.scss';
import * as zod from "zod";
import Logo from "../../assets/imgs/logo_ana.png";
import { BackButton } from '../../components/backButton';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { InputText } from '../../components/inputs/inputText';
import { CustomButton } from '../../components/customButton';
import { postFirstAcess } from '../../services/http/auth';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';

const formSchema = zod.object({
    token: zod.string({
        required_error: "Campo obrigatório",
    }),
    email: zod.string({
        required_error: "Campo obrigatório",
    }).email({
        message: "E-mail inválido"
    }),
    password: zod.string({
        required_error: "Campo obrigatório",
    }).min(8, {
        message: "Mínimo de 8 caracteres"
    }),
    password_confirmation: zod.string({
        required_error: "Campo obrigatório",
    }).min(8, {
        message: "Mínimo de 8 caracteres"
    }),

}).superRefine((val, ctx) => {

    if (val.password != val.password_confirmation) {
        ctx.addIssue({
            message: "Senhas não batem",
            path: ["password_confirmation"],
            code: 'custom'
        });
        return zod.NEVER;
    }
})

type TFormSchema = zod.infer<typeof formSchema>;

export function FirstAccessPage() {
    const { handleFetching, fetching, signIn } = useAuth();
    const { handleSubmit, formState: { errors }, control, setValue } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            token: undefined,
            email: undefined,
            password: undefined,
            password_confirmation: undefined
        }
    })
    const navigate = useNavigate();

    function goBack() {
        navigate('/');
    }

    async function handleCreate(data: TFormSchema) {
        if (fetching) {
            return
        }
        try {
            handleFetching(true);
            await postFirstAcess(data.token, data.email, data.password, data.password_confirmation);
            //await signIn(data.email, data.password);
            toast.success("Cadastro aprovado");
            navigate('/');
            handleFetching(false);
        } catch (error) {
            handleFetching(false);
            toast.error("Erro ao enviar, verifique os dados e tente novamente.");
        }
    }

    return (
        <main className={styles.main} >
            <header>
                <img src={Logo} alt="Ana Lúcia e Associados" />
            </header>
            <div className={styles.backbtn_container}>
                <BackButton click={goBack} />
            </div>
            <form action="submit" onSubmit={handleSubmit(handleCreate)}>
                <InputText
                    control={control}
                    fieldName='token'
                    title='Token (Enviado no e-mail)'
                    type='text'
                    errors={errors}
                />
                <InputText
                    control={control}
                    fieldName='email'
                    title='E-mail'
                    type='email'
                    errors={errors}
                />
                <InputText
                    control={control}
                    fieldName='password'
                    title='Senha'
                    type='password'
                    errors={errors}
                />
                <InputText
                    control={control}
                    fieldName='password_confirmation'
                    title='Confirmar senha'
                    type='password'
                    errors={errors}
                />
                <br />
                <CustomButton
                    title='Enviar'
                    variation='2'
                />
            </form>
        </main>
    )
}