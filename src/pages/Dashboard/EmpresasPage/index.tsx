import { Outlet } from 'react-router-dom';
import { EmpresasTable } from './EmpresasTable';
import styles from './styles.module.scss';

export function EmpresasPage() {

    return (
        <main className={`${styles.main} dashboard_padding`}>

            <Outlet />
        </main>
    )
}