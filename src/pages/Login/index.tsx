import { IconInput } from '../../components/inputs/IconInput';
import styles from './styles.module.scss';
import Logo from "../../assets/imgs/logo_ana.png";
import { Link, useNavigate } from 'react-router-dom'
import * as zod from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postLogin, postMe } from '../../services/http/auth';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import { IPostLoginRes } from '../../services/http/auth/auth.dto';

const formSchema = zod.object({
    email: zod.string(),
    password: zod.string(),
});

type TFormSchema = zod.infer<typeof formSchema>;

export function LoginPage() {
    const navigate = useNavigate();
    const { setUseToken, setUserData } = useAuth();
    const { handleSubmit, control } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: 'wcostaprijo@hotmail.com',
            password: '123456789',
        }
    })

    async function handleLogin(_data: TFormSchema) {

        try {
            const { data } = await postLogin(_data.email, _data.password);
            saveToken(data);
            const { data: user } = await postMe(data.access_token);
            setUserData(user);
            navigate("/dashboard/home");
        } catch (error) {
            console.log(error);
            toast.error("E-mail ou senha inválidos.");
        }

    }

    function saveToken(data: IPostLoginRes) {
        setUseToken(data.access_token);
        localStorage.setItem(
            '@auth',
            JSON.stringify({
                access_token: data.access_token,
                token_type: data.token_type,
                expires_in: data.expires_in,
                login_time: new Date().getTime(),
            })
        );
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