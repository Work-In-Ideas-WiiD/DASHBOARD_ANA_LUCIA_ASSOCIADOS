import styles from './styles.module.scss';
import * as zod from "zod";
import { useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { InputText } from '../../../components/inputs/inputText';
import { CustomButton } from '../../../components/customButton';
import { postResetPassword } from '../../../services/http/auth';
import { toast } from 'react-toastify';
import { useAuth } from '../../../hooks/useAuth';

const formSchema = zod.object({
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

export function ResetPasswordSecondStep() {
    const params = useParams();
    const { handleFetching, fetching, signIn } = useAuth();
    const { handleSubmit, formState: { errors }, control } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: undefined,
            password: undefined,
            password_confirmation: undefined
        }
    })
    async function handleCreate(data: TFormSchema) {
        if (fetching) {
            return
        }
        try {
            handleFetching(true);
            const token = params.id as string;
            await postResetPassword(token, data.email, data.password, data.password_confirmation);
            handleFetching(false);
            toast.success("Senha alterada.")
            await signIn(data.email, data.password);
        } catch (error) {
            handleFetching(false);
            toast.error("Erro ao enviar, verifique os dados e tente novamente.");
        }
    }

    return (
        <form action="submit" className={styles.form} onSubmit={handleSubmit(handleCreate)}>
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
    )
}