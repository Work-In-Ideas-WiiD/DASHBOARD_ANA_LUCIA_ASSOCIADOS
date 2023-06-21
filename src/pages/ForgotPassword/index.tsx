import { Outlet, useNavigate } from "react-router-dom"
import styles from './styles.module.scss';
import { BackButton } from "../../components/backButton";
import Logo from "../../assets/imgs/logo_ana.png";

export function ForgotPassword() {
    const navigate = useNavigate();

    function goBack() {
        navigate('/');
    }

    return (
        <main className={styles.main} >
            <header>
                <img src={Logo} alt="Ana Lúcia e Associados" />
            </header>
            <div className={styles.backbtn_container}>
                <BackButton click={goBack} />
            </div>
            <Outlet />
        </main>
    )
}