import styles from './styles.module.scss';
import * as zod from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputText } from '../../../../components/inputs/inputText';
import { CustomInputMask } from '../../../../components/inputs/customInputMask';
import { CustomButton } from '../../../../components/customButton';
import { CustomSelectInput } from '../../../../components/inputs/customSelectInput';

const selectOptions = [
    { value: 'master', label: 'Administrador Master' },
    { value: 'empresa', label: 'Administrador - Empresa' },
];

const formSchema = zod.object({
    nome: zod.string({
        required_error: "Campo obrigatório",
    }),
    cpf: zod.string({
        required_error: "Campo obrigatório",
    }),
    email: zod.string({
        required_error: "Campo obrigatório",
    }).email({
        message: "E-mail inválido"
    }),
    tipo: zod.object({
        value: zod.string(),
        label: zod.string()
    }, {
        required_error: "Campo obrigatório",
    })
});

type TFormSchema = zod.infer<typeof formSchema>;

export function NovoAdministrador() {
    const { handleSubmit, formState: { errors }, control } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: undefined,
            cpf: undefined,
            email: undefined,
            tipo: undefined,
        }
    })

    function handleCreate(data: TFormSchema) {
        console.log(data);
    }
    return (
        <section className={styles.new_contract}>
            <h2 className={`${styles.title} dashboard_title`}>NOVO CADASTRO</h2>
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
                        fieldName='cpf'
                        control={control}
                        title='CPF'
                        containerClass={styles.w25}
                        mask='999.999.999-99'
                        errors={errors}
                    />
                    <CustomSelectInput
                        title='Tipo'
                        placeholder=""
                        errors={errors}
                        fieldName='tipo'
                        options={selectOptions}
                        control={control}
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