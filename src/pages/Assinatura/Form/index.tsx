import styles from './styles.module.scss';
import { useState } from 'react';
import { AssinaturaFormSteper } from '../../../components/assinaturaFormSteper';
import { IoArrowBack } from 'react-icons/io5';
import { InputText } from '../../../components/inputs/inputText';
import { CustomInputMask } from '../../../components/inputs/customInputMask';
import { CustomButton } from '../../../components/customButton';
import VerificationInput from "react-verification-input";
import * as zod from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

type TStep = 1 | 2;   
const formSchema = zod.object({
    nome: zod.string({
        required_error: "Campo obrigatório",
    }),
    cpf: zod.string({
        required_error: "Campo obrigatório",
    }),
    data: zod.string({
        required_error: "Campo obrigatório",
    })

});

type TFormSchema = zod.infer<typeof formSchema>;

export function AssinaturaForm() {
    const [step, setStep] = useState<TStep>(1);
    const navigate = useNavigate();
    const { handleSubmit, formState: { errors }, control } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: undefined,
            cpf: undefined,
            data: undefined,
        }
    })
    function goBack() {
        navigate("/dashboard/assinaturas");
    }
    function handleStep(step: TStep) {
        setStep(step);
    }

    function returnCurrentForm(step: TStep = 1) {
        if (step === 1) {
            return (
                <form onSubmit={handleSubmit(() => { handleStep(2) })}>
                    <AssinaturaFormSteper active={step} />
                    <h2>Confirme seus dados</h2>
                    <div className={styles.container_inputs}>
                        <InputText
                            errors={errors}
                            control={control}
                            title='Nome completo'
                            fieldName='nome'
                        />
                        <CustomInputMask
                            control={control}
                            title='CPF'
                            mask='999.999.999-99'
                            errors={errors}
                            fieldName='cpf'
                        />
                        <CustomInputMask
                            fieldName='data'
                            control={control}
                            title='Data de nascimento (DD/MM/AAAA)'
                            mask='99/99/9999'
                            errors={errors}
                        />
                    </div>
                    <div className={styles.btn_container}>
                        <CustomButton
                            title='Avançar'
                            variation='2'
                        />
                    </div>
                </form>
            )
        } else {
            return (
                <form>
                    <AssinaturaFormSteper active={2} />
                    <h2 className={styles.f2_title}>Token de autenticação</h2>
                    <h3 className={styles.f2_text1}>Enviado para wanderson@gmail.com</h3>
                    <div className={styles.container_input_verification}>
                        <VerificationInput
                            length={5}
                            placeholder=""
                            classNames={{
                                container: styles.container_verification,
                                character: styles.character,
                                characterInactive: styles.character_inactive,
                                characterSelected: styles.character_selected,
                            }}
                        />
                    </div>
                    <div className={styles.btn_container}>
                        <CustomButton
                            title='Finalizar'
                            variation='2'
                        />
                    </div>
                    <span className={styles.re_send}>Reenviar token via e-mail</span>
                    <span className={styles.terms}>
                        Ao clicar em finalizar, você concorda <br />
                        com os Termos de uso e Política de <br />
                        Privacidade - LGPD
                    </span>
                </form>
            )
        }
    }

    return (
        <section className={styles.container}>
            <div className={styles.back_btn}
                onClick={goBack}
            >
                <IoArrowBack color="#A7BFB0" size={34} />
            </div>
            {
                returnCurrentForm(step)
            }

        </section>
    )
}