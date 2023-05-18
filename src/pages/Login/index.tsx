import { IconInput } from '../../components/inputs/IconInput';
import styles from './styles.module.scss';
import Logo from "../../assets/imgs/logo_ana.png";
import { Link, useNavigate } from 'react-router-dom'
import * as zod from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = zod.object({
    email: zod.string(),
    password: zod.string(),
});

type TFormSchema = zod.infer<typeof formSchema>;

export function LoginPage() {
    const navigate = useNavigate();
    const { handleSubmit, control } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    function handleLogin(data: TFormSchema) {
        navigate("/dashboard/home")
    }

    return (
        <main className={styles.main}>
            <form onSubmit={handleSubmit(handleLogin)}>
                <img src={Logo} alt="logo" />
                <div className={styles.input_container}>
                    <IconInput
                        fieldName='email'
                        control={control}
                        type='text'
                        icon='login'
                        placeholder='Usuario'
                    ></IconInput>
                    <IconInput
                        fieldName='password'
                        control={control}
                        type='password'
                        icon='password'
                        placeholder='Senha'
                    ></IconInput>
                </div>

                <Link className={`react-router-Link ${styles.forgot_password}`} to={'/'}>Esqueci a senha.</Link>
                <button type='submit' className={styles.submit_button}>
                    Entrar
                </button>
                <Link className={`react-router-Link ${styles.first_access}`} to={'/'}>É seu primeiro acesso? <span>Cadastrar senha.</span></Link>
            </form>
        </main>
    )
}