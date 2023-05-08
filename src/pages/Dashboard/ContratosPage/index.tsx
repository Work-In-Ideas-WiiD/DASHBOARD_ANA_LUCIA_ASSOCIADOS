import { Outlet } from 'react-router-dom';
import styles from './styles.module.scss';

export function ContratosPage() {
    return (
        <main className={`${styles.main} dashboard_padding`}>
            <Outlet />
        </main>
    )
}