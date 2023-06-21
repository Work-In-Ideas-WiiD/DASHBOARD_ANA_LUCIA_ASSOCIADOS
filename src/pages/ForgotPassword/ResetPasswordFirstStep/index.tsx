import styles from './styles.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { InputText } from '../../../components/inputs/inputText';
import { CustomButton } from '../../../components/customButton';
import { toast } from 'react-toastify';
import { useAuth } from '../../../hooks/useAuth';
import * as zod from "zod";
import { postRequestResetPassword } from '../../../services/http/auth';

const formSchema = zod.object({
    email: zod.string({
        required_error: "Campo obrigatório",
    }).email({
        message: "E-mail inválido"
    })
})

type TFormSchema = zod.infer<typeof formSchema>;

export function ResetPasswordFirstStep() {
    const { handleFetching, fetching } = useAuth();
    const { handleSubmit, formState: { errors }, control } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: undefined,
        }
    })

    async function handleCreate(data: TFormSchema) {
        if (fetching) {
            return
        }
        try {
            handleFetching(true);
            await postRequestResetPassword(data.email);
            handleFetching(false);
            toast.success("Te enviamos um e-mail para recuperar sua senha.");
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
            <br />
            <CustomButton
                title='Enviar'
                variation='2'
            />
        </form>
    )
}