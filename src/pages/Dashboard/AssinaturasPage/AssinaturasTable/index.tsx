import styles from './styles.module.scss';
import { StatusBadge } from '../../../../components/statusBadge/statusBadge';
import { TableCustomButton } from '../../../../components/tableCustomButton';
import { FaTrash } from 'react-icons/fa';

export function AssinaturasTable() {

    return (
        <section className={styles.table}>
            <table className='table_style'>
                <thead >
                    <tr>
                        <th>
                            Nome da empresa
                        </th>
                        <th>
                            Nome do cliente final
                        </th>
                        <th>
                            Status - Empresa
                        </th>
                        <th>
                            Status - Cliente
                        </th>
                        <th>
                            Data do envio
                        </th>
                        <th colSpan={2}>
                            Ações
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Clínica Médica Nobel S.A  </td>
                        <td>Allan Ferreira Neto </td>
                        <td><StatusBadge status='Assinado' /></td>
                        <td><StatusBadge status='Assinado' /></td>
                        <td>27/01/2023</td>
                        <td><TableCustomButton title='Reenviar e-mails' /></td>
                        <td>
                            <button type='button' className={styles.delete_button}>
                                <FaTrash color="#D64646" size={19} />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}