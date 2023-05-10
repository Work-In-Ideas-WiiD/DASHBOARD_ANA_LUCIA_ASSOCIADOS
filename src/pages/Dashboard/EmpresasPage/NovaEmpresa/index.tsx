import styles from './styles.module.scss';
import { CustomInputMask } from '../../../../components/inputs/customInputMask';
import { InputText } from '../../../../components/inputs/inputText';
import { CustomButton } from '../../../../components/customButton';
import * as zod from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = zod.object({
    nome: zod.string(),
    cpf: zod.string(),
    nome_empresa: zod.string(),
    cnpj: zod.string(),
    email: zod.string(),
    celular: zod.string(),
    endereco: zod.string(),
    numero: zod.string(),
    bairro: zod.string(),
    cidade: zod.string(),
    estado: zod.string(),
    complemento: zod.string(),
    cep: zod.string(),
})

type TFormSchema = zod.infer<typeof formSchema>;

export function NovaEmpresa() {

    const { handleSubmit, control } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: '',
            cpf: '',
            nome_empresa: '',
            cnpj: '',
            email: '',
            celular: '',
            endereco: '',
            numero: '',
            bairro: '',
            cidade: '',
            estado: '',
            complemento: '',
            cep: '',
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
                    <div className={styles.input_container}>
                        <InputText
                            control={control}
                            fieldName='nome'
                            title='Nome'
                            containerClass={styles.w75}
                        />
                        <CustomInputMask
                            fieldName='cpf'
                            control={control}
                            title='CPF'
                            containerClass={styles.w25}
                            mask='999.999.999-99'
                        />
                    </div>
                    <div className={styles.input_container}>
                        <InputText
                            control={control}
                            fieldName='nome_empresa'
                            title='Nome da empresa'
                            containerClass={styles.w75}
                        />
                        <CustomInputMask
                            control={control}
                            fieldName='cnpj'
                            title='CNPJ'
                            containerClass={styles.w25}
                            mask='99.999.999/9999-99'
                        />
                    </div>
                    <div className={styles.input_container}>
                        <InputText
                            fieldName='email'
                            control={control}
                            title='E-mail'
                            containerClass={styles.w63}
                        />
                        <CustomInputMask
                            control={control}
                            fieldName='celular'
                            title='Celular'
                            containerClass={styles.w36}
                            mask='(99) 99999-9999'
                        />
                    </div>
                    <div className={styles.input_container}>
                        <InputText
                            fieldName='endereco'
                            control={control}
                            title='Endereço'
                            containerClass={styles.w77}
                        />
                        <InputText
                            control={control}
                            fieldName='numero'
                            title='Número'
                            containerClass={styles.w18}
                        />
                    </div>
                    <div className={styles.input_container}>
                        <InputText
                            control={control}
                            fieldName='bairro'
                            title='Bairro'
                            containerClass={styles.w44}
                        />
                        <InputText
                            control={control}
                            fieldName='cidade'
                            title='Cidade'
                            containerClass={styles.w29}
                        />
                        <InputText
                            control={control}
                            fieldName='estado'
                            title='Estado'
                            containerClass={styles.w26}
                        />
                    </div>
                    <div className={styles.input_container}>
                        <InputText
                            fieldName='complemento'
                            control={control}
                            title='Complemento'
                            containerClass={styles.w70}
                        />
                        <CustomInputMask
                            control={control}
                            fieldName='cep'
                            mask="999.999.999-99"
                            title='CEP'
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