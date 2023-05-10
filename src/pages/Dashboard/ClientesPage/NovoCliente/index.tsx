import { useState } from 'react';
import { CustomInputMask } from '../../../../components/inputs/customInputMask';
import { InputText } from '../../../../components/inputs/inputText';
import styles from './styles.module.scss';
import { CustomButton } from '../../../../components/customButton';

export function NovoCliente() {

    const [cpf, setCpf] = useState('');
    const [cep, setCep] = useState('');
    const [celular, setCelular] = useState('');

    return (
        <section className={styles.new_contract}>
            <h2 className={`${styles.title} dashboard_title`}>NOVO CADASTRO</h2>
            <div className={styles.form_wrapper}>
                <form>
                    <div className={styles.input_container}>
                        <InputText
                            title='Nome'
                            containerClass={styles.w75}
                        />
                        <CustomInputMask
                            title='CPF'
                            containerClass={styles.w25}
                            mask='999.999.999-99'
                            onChange={(e) => {
                                setCpf(e.target.value)
                            }}
                        />
                    </div>
                    <div className={styles.input_container}>
                        <InputText
                            title='Nome da empresa'
                            containerClass={styles.w75}
                        />
                        <CustomInputMask
                            title='CNPJ'
                            containerClass={styles.w25}
                            mask='99.999.999/9999-99'
                            onChange={(e) => {
                                setCpf(e.target.value)
                            }}
                        />
                    </div>
                    <div className={styles.input_container}>
                        <InputText
                            title='E-mail'
                            containerClass={styles.w63}
                        />
                        <CustomInputMask
                            title='Celular'
                            containerClass={styles.w36}
                            mask='(99) 99999-9999'
                            onChange={(e) => {
                                setCelular(e.target.value)
                            }}
                        />
                    </div>
                    <div className={styles.input_container}>
                        <InputText
                            title='Endereço'
                            containerClass={styles.w77}
                        />
                        <InputText
                            title='Número'
                            containerClass={styles.w18}
                        />
                    </div>
                    <div className={styles.input_container}>
                        <InputText
                            title='Bairro'
                            containerClass={styles.w44}
                        />
                        <InputText
                            title='Cidade'
                            containerClass={styles.w29}
                        />
                        <InputText
                            title='Estado'
                            containerClass={styles.w26}
                        />
                    </div>
                    <div className={styles.input_container}>
                        <InputText
                            title='Complemento'
                            containerClass={styles.w70}
                        />
                        <CustomInputMask
                            title='CEP'
                            containerClass={styles.w30}
                            mask='99999-999'
                            onChange={(e) => {
                                setCep(e.target.value)
                            }}
                        />
                    </div>
                    <div className={styles.btn_container}>
                        <CustomButton
                            variation='3'
                            title='Salvar'
                        />
                    </div>
                </form>
            </div>
        </section>
    )
}