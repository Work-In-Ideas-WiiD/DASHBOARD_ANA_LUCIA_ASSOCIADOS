import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/sidebar';
import styles from './styles.module.scss';
import { MobileHeader } from '../../components/mobileHeader';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

export function DashboardPage() {
    const { me } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (me.id == "") {
            navigate("/");
        }
    }, [])

    return (
        <main className={styles.main}>
            <div className={styles.aside_container}>
                <Sidebar />
            </div>
            <div className={styles.outlat_container}>
                <MobileHeader />
                <Outlet />
            </div>
        </main>
    )
}