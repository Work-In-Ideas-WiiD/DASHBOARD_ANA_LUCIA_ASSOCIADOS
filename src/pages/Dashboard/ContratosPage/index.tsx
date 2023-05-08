import { ContratosTable } from './ContratosTable';
import styles from './styles.module.scss';

export function ContratosPage() {
    return (
        <main className={`${styles.main} dashboard_padding`}>
            <h2 className={`${styles.title} dashboard_title`}>CONTRATOS</h2>
            <ContratosTable />
        </main>
    )
}