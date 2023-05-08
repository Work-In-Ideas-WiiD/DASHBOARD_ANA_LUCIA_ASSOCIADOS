import { AssinaturasTable } from './AssinaturasTable';
import styles from './styles.module.scss';

export function AssinaturasPage() {
    return (
        <main className={`${styles.main} dashboard_padding`}>
            <h2 className={`${styles.title} dashboard_title`}>Assinaturas</h2>
            <AssinaturasTable />
        </main>
    )
}