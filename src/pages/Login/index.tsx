import { IconInput } from '../../components/inputs/IconInput';
import styles from './styles.module.scss';
import Logo from "../../assets/imgs/logo_ana.png";
import { Link } from 'react-router-dom'
import * as zod from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = zod.object({
    email: zod.string(),
    password: zod.string(),
});

type TFormSchema = zod.infer<typeof formSchema>;

export function LoginPage() {

    const { handleSubmit, control } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    function handleLogin(data: TFormSchema) {
        console.log(data);
    }

    return (
        <main className={styles.main}>
            <form onSubmit={handleSubmit(handleLogin)}>
                <img src={Logo} alt="logo" />
                <IconInput
                    fieldName='email'
                    control={control}
                    type='text'
                    icon='login'
                    placeholder='Usuario'
                    inputClass='mb-30'
                ></IconInput>
                <IconInput
                    fieldName='password'
                    control={control}
                    type='password'
                    icon='password'
                    placeholder='Senha'
                ></IconInput>
                <Link className={`react-router-Link ${styles.forgot_password}`} to={'/'}>Esqueci a senha.</Link>
                <button type='submit' className={styles.submit_button}>
                    Salvar
                </button>
                <Link className={`react-router-Link ${styles.first_access}`} to={'/'}>É seu primeiro acesso? <span>Cadastrar senha.</span></Link>
            </form>
        </main>
    )
}