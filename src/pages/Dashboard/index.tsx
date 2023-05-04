import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components/sidebar';
import styles from './styles.module.scss';

export function DashboardPage() {

    return (
        <main className={styles.main}>
            <div className={styles.aside_container}>
                <Sidebar />
            </div>
            <div className={styles.outlat_container}>
                <Outlet />
            </div>
        </main>
    )
}