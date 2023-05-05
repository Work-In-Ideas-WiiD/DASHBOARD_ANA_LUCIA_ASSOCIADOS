import { EmpresasTable } from './EmpresasTable';
import styles from './styles.module.scss';

export function EmpresasPage() {

    return (
        <main className={`${styles.main} dashboard_padding`}>
            <h2 className={`${styles.title} dashboard_title`}>EMPRESAS</h2>
            <EmpresasTable />
        </main>
    )
}