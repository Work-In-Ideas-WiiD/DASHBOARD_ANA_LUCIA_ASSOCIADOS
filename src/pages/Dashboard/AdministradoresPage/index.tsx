import { Outlet } from 'react-router-dom';
import styles from './styles.module.scss';
import { useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';

export function AdministradoresPage() {
    const { isAdmin, signOut } = useAuth();

    useEffect(() => {
        if (!isAdmin) {
            signOut();
        }
    }, []);

    return (
        <main className={`${styles.main} dashboard_padding`}>
            <Outlet />
        </main>
    )
}