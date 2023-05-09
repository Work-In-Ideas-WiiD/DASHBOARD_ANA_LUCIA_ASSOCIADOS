import styles from './styles.module.scss';
import Logo from '../../assets/imgs/logo_ana.png';
import { Outlet } from 'react-router-dom';

export function Assinatura() {
    return (
        <main className={styles.main}>
            <header>
                <img src={Logo} alt="Ana Lúcia e Associados" />
            </header>
            <Outlet />
        </main>
    )
}