import { Outlet } from 'react-router-dom';
import styles from './styles.module.scss';
import { useAuth } from '../../../hooks/useAuth';
import { useEffect } from 'react';

export function EmpresasPage() {
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