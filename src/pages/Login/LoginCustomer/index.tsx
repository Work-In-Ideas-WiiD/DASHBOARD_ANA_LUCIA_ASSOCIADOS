import { IconInput } from '../../../components/inputs/IconInput';
import styles from './styles.module.scss';
import Logo from "../../../assets/imgs/logo_ana_login.png";
import { Link } from 'react-router-dom'
import * as zod from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../../hooks/useAuth';
import { RotatingLines } from 'react-loader-spinner';
import { InputText } from '../../../components/inputs/inputText';
import { IGetEmpresasDataRes } from '../../../services/http/empresas/empresas.dto';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { getEmpresaLogin, getEmpresas } from '../../../services/http/empresas';

const formSchema = zod.object({
    email: zod.string(),
    password: zod.string(),
    empresa: zod.string({
        required_error: "Campo obrigatório",
    }),
});

type TFormSchema = zod.infer<typeof formSchema>;

export function LoginCustomer() {

    const { signInCustomer, fetching } = useAuth();
    const [debounceValue, setDebounceValue] = useState("");
    const [companies, setCompanies] = useState<IGetEmpresasDataRes[]>([]);
    const [debouncedText] = useDebounce(debounceValue, 500);
    const [companyId, setCompanyId] = useState<string | null>(null);
    const { handleSubmit, formState: { errors }, control, setValue } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            empresa: undefined,
        }
    })

    useEffect(() => {
        searchCompany();
    }, [debouncedText])

    async function searchCompany() {

        if (debouncedText) {
            const { data } = await getEmpresaLogin(debouncedText);
            setCompanies(data.data);
        } else {
            clearCompanies();
        }
    }

    async function handleLogin(_data: TFormSchema) {
        await signInCustomer(_data.email, _data.password, companyId!);
    }

    function setDebounce(event: React.ChangeEvent<HTMLInputElement>) {
        setDebounceValue(event.target.value);
        setValue("empresa", event.target.value);
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

    function clearCompanies() {
        setTimeout(() => {
            setCompanies([]);
        }, 200);
    }

    function selectCompany(value: IGetEmpresasDataRes) {
        setValue("empresa", value.nome!);
        setCompanyId(value.id);
    }

    function renderCompanyList(list: IGetEmpresasDataRes[]) {
        if (list.length == 0) {
            return (<></>)
        }
        return list.map((item) => {
            return (
                <div className={styles.item} key={item.id} onClick={(e) => {
                    e.stopPropagation();
                    selectCompany(item);
                }}>
                    <span>{item.nome}</span>
                </div>
            )
        })
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
                    <div className={styles.input_search}>
                        <IconInput
                            onBlur={clearCompanies}
                            control={control}
                            fieldName='empresa'
                            title='Empresa'
                            type='tel'
                            placeholder='Empresa'
                            icon='building'
                            onChange={setDebounce}
                        ></IconInput>
                        <div className={styles.company_list}>
                            {renderCompanyList(companies)}
                        </div>
                    </div>
                </div>
                <Link className={`react-router-Link ${styles.forgot_password}`} to={'/recuperar'}>Esqueci a senha.</Link>
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