import { IconInput } from '../../components/inputs/IconInput';
import styles from './styles.module.scss';
import Logo from "../../assets/imgs/logo_ana.png";
import { Link } from 'react-router-dom';

export function LoginPage() {
    return (
        <main className={styles.main}>
            <form >
                <img src={Logo} alt="logo" />
                <IconInput type='text' icon='login' placeholder='Usuario' inputClass='mb-30'></IconInput>
                <IconInput type='password' icon='password' placeholder='Senha'></IconInput>
                <Link className={`react-router-Link ${styles.forgot_password}`} to={'/'}>Esqueci a senha.</Link>
                <button type='button' className={styles.submit_button}>
                    Salvar
                </button>
                <Link className={`react-router-Link ${styles.first_access}`} to={'/'}>É seu primeiro acesso? <span>Cadastrar senha.</span></Link>
            </form>
        </main>
    )
}