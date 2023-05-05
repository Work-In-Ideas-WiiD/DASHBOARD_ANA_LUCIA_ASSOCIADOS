import { CustomButton } from '../../../../components/customButton';
import { StatusBadge } from '../../../../components/statusBadge/statusBadge';
import styles from './styles.module.scss';

export function HomeTable() {

    return (
        <section className={styles.table}>
            <div className={styles.table_header}>
                <label className={styles.table_title}>CONTRATOS</label>
                <CustomButton value='VER TUDO' />
            </div>
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
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Clínica Médica Nobel S.A </td>
                        <td>Allan Ferreira Neto</td>
                        <td><StatusBadge status='Assinado' /></td>
                        <td><StatusBadge status='Assinado' /></td>
                        <td>27/01/2023</td>
                    </tr>
                    <tr>
                        <td>Clínica Médica Nobel S.A </td>
                        <td>Allan Ferreira Neto</td>
                        <td><StatusBadge status='Pendente' /></td>
                        <td><StatusBadge status='Pendente' /></td>
                        <td>27/01/2023</td>
                    </tr>
                </tbody>
            </table>
        </section>

    )
}