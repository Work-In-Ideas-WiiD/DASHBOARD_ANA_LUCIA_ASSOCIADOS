import styles from './styles.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { InputText } from '../../../components/inputs/inputText';
import { CustomButton } from '../../../components/customButton';
import { toast } from 'react-toastify';
import { useAuth } from '../../../hooks/useAuth';
import * as zod from "zod";
import { postRequestResetPassword } from '../../../services/http/auth';
import { IPostRequestResetPasswordModel } from '../../../services/http/auth/auth.dto';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const formSchema = zod.object({
    email: zod.string({
        required_error: "Campo obrigatório",
    }).email({
        message: "E-mail inválido"
    }),
    companyId: zod.string({
        required_error: "Campo obrigatório",
    })
})

type TFormSchema = zod.infer<typeof formSchema>;

export function ResetPasswordFirstStep() {
    const params = useParams();
    const { handleFetching, fetching } = useAuth();
    const { handleSubmit, formState: { errors }, control } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: undefined,
            companyId: '',
        }
    })
    const [showCompanyInput, setShowCompanyInput] = useState(false);

    useEffect(() => {
        if (params.target == "cliente") {
            setShowCompanyInput(true);
        }
    }, [])

    async function handleCreate(data: TFormSchema) {
        if (fetching) {
            return
        }
        try {
            handleFetching(true);
            const model: IPostRequestResetPasswordModel = {
                email: data.email
            }
            if (params.target == "cliente") {
                model.empresa_id = data.companyId;
            }
            await postRequestResetPassword(model);
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
            {
                showCompanyInput && (
                    <InputText
                        control={control}
                        fieldName='companyId'
                        title='ID da empresa'
                        type='text'
                        errors={errors}
                    />
                )
            }
            <br />
            <CustomButton
                title='Enviar'
                variation='2'
            />
        </form>
    )
}