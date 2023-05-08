import { useState } from 'react';
import { CustomInputMask } from '../../../../components/inputs/customInputMask';
import { InputText } from '../../../../components/inputs/inputText';
import styles from './styles.module.scss';
import { CustomButton } from '../../../../components/customButton';

export function NovoAdministrador() {



    return (
        <section className={styles.new_contract}>
            <h2 className={`${styles.title} dashboard_title`}>NOVO CADASTRO</h2>

        </section>
    )
}