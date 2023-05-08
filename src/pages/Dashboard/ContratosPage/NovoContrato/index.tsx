import { CustomButton } from '../../../../components/customButton';
import { CustomCheckbox } from '../../../../components/inputs/customCheckbox';
import { InputText } from '../../../../components/inputs/inputText';
import styles from './styles.module.scss';
import { FaFileUpload } from 'react-icons/fa';

export function NovoContrato() {
    return (
        <section className={styles.new_contract}>
            <h2 className={`${styles.title} dashboard_title`}>NOVO CADASTRO</h2>
            <div className={styles.form_wrapper}>
                <form action="submit">
                    <InputText
                        title='Número do contrato'
                        type='tel'
                        placeholder='111111111'
                        containerClass='mb-14'
                    />
                    <InputText
                        title='Empresa'
                        type='tel'
                        placeholder='Empresa'
                        containerClass='mb-25'
                    />
                    <div className={styles.chk_wrapper}>
                        <CustomCheckbox
                            id='1'
                        />
                        <label className={styles.chk_label}>Enviar este contrato agora para a empresa</label>
                    </div>
                    <div className={styles.input_file_wrapper}>
                        <label htmlFor="upload-file">
                            <FaFileUpload color="#CE6E40" size="27" />
                            <span>Upload do arquivo</span>
                        </label>
                        <input type="file" id='upload-file' />
                    </div>
                    <CustomButton
                        title='Adicionar contrato'
                        variation='2'
                    />
                </form>
            </div>
        </section>
    )
}