import { AdministradoresTable } from './AdministradoresTable';
import styles from './styles.module.scss';

export function AdministradoresPage() {
    return (
        <main className={`${styles.main} dashboard_padding`}>
            <h2 className={`${styles.title} dashboard_title`}>ADMINISTRADORES</h2>
            <AdministradoresTable />
        </main>
    )
}