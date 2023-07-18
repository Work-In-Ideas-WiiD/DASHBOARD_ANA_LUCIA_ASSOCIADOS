import { Outlet } from 'react-router-dom';
import styles from './styles.module.scss';
import { useAuth } from '../../../hooks/useAuth';
import { useEffect } from 'react';

export function EmpresasPage() {
    const { userRole, signOut } = useAuth();

    useEffect(() => {
        if (!userRole.includes("administrador")) {
            signOut();
        }
    }, []);
    return (
        <main className={`${styles.main} dashboard_padding`}>

            <Outlet />
        </main>
    )
}