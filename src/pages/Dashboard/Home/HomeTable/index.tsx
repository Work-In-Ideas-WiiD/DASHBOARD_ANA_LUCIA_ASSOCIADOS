import { CustomButton } from '../../../../components/customButton';
import styles from './styles.module.scss';

export function HomeTable() {

    return (
        <section className={styles.table}>
            <div className={styles.table_header}>
                <label className={styles.table_title}>CONTRATOS</label>
                <CustomButton value='VER TUDO' />
            </div>
            <table className='table_style'>
                <thead className='thead_style'>
                    <tr>
                        <th>

                        </th>
                    </tr>
                </thead>
            </table>
        </section>

    )
}