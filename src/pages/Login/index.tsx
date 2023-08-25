import { IconInput } from '../../components/inputs/IconInput';
import styles from './styles.module.scss';
import Logo from "../../assets/imgs/logo_ana_login.png";
import { Link } from 'react-router-dom'
import * as zod from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../hooks/useAuth';
import { RotatingLines } from 'react-loader-spinner';

const formSchema = zod.object({
    email: zod.string(),
    password: zod.string(),
});

type TFormSchema = zod.infer<typeof formSchema>;

export function LoginPage() {

    const { signIn, fetching } = useAuth();
    const { handleSubmit, control } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })
    // test
    // email: 'wcostaprijo@hotmail.com',
    // password: '123456789',
    async function handleLogin(_data: TFormSchema) {
        await signIn(_data.email, _data.password);
    }

    function _renderBtnContent(title: string, loading: boolean) {
        if (loading) {
            return (
                <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="1.00"
                    width="24"
                    visible={true}
                />
            )
        }

        return title;
    }

    return (
        <main className={styles.main}>
            <form onSubmit={handleSubmit(handleLogin)}>
                <img className={styles.logo} src={Logo} alt="logo" />
                <div className={styles.input_container}>
                    <IconInput
                        autoComplete="email"
                        fieldName='email'
                        control={control}
                        type='text'
                        icon='login'
                        placeholder='Usuario'
                    ></IconInput>
                    <IconInput
                        autoComplete="current-password"
                        fieldName='password'
                        control={control}
                        type='password'
                        icon='password'
                        placeholder='Senha'
                    ></IconInput>
                </div>

                <Link className={`react-router-Link ${styles.forgot_password}`} to={'/recuperar/email/empresa'}>Esqueci a senha.</Link>
                <Link className={`react-router-Link ${styles.forgot_password}`} to={'/cliente'}>Entrar como cliente</Link>
                <button type='submit' className={styles.submit_button}>
                    {
                        _renderBtnContent("Entrar", fetching)
                    }
                </button>
                <Link className={`react-router-Link ${styles.first_access}`} to={'/primeiroacesso'}>É seu primeiro acesso? <span>Cadastrar senha.</span></Link>
            </form>
        </main>
    )
}