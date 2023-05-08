import { Outlet } from 'react-router-dom';
import styles from './styles.module.scss';

export function AdministradoresPage() {
    return (
        <main className={`${styles.main} dashboard_padding`}>
            <Outlet />
        </main>
    )
}