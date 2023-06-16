import { Outlet } from 'react-router-dom';
import styles from './styles.module.scss';

export function ArquivosPage() {
    return (
        <main className={`${styles.main} dashboard_padding`}>
            <Outlet />
        </main>
    )
}