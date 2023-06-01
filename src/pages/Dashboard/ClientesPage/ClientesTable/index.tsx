import styles from './styles.module.scss';
import { CustomButton, EIconCustomButton } from "../../../../components/customButton";
import { SearchBar } from '../../../../components/inputs/searchBar';
import { useEffect, useState } from 'react';
import { TableSelectInput } from '../../../../components/inputs/tableSelectInput';
import { useNavigate } from 'react-router-dom';
import * as zod from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IUserReqProps } from '../../../../services/http/user/user.dto';
import { useAuth } from '../../../../hooks/useAuth';
import { getUsersList } from '../../../../services/http/user';

const formSchema = zod.object({
    search: zod.string(),
    type: zod.object({
        value: zod.string(),
        label: zod.string()
    })
});

type TFormSchema = zod.infer<typeof formSchema>;

const selectOptions = [
    { value: 'clientes', label: 'Clientes' },
    { value: 'empresas', label: 'Empresas' },
]
export function ClienteTable() {
    const [fetching, setFetching] = useState(false);
    const navigate = useNavigate();
    const [users, setUsers] = useState<IUserReqProps[]>([]);

    useEffect(() => {
        console.log("use effect");

        getData();

    }, []);

    async function getData() {
        const { data } = await getUsersList();
        setUsers(data.data);
    }

    const { handleSubmit, control } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: '',
        }
    })

    function searchData(data: TFormSchema) {
        //setFetching(true);
        console.log(data);
    }

    function goTo() {
        navigate("novo");
    }

    function _renderItem(itens: IUserReqProps[]) {
        return itens.map((item) => {

            const documentId = item.cnpj ? item.cnpj : item.cpf;

            return (
                <tr key={item.id}>
                    <td>{item.nome} </td>
                    <td>{item.nome_empresa}</td>
                    <td>{documentId}</td>
                    <td>{item.email}</td>
                    <td>{item.contato}</td>
                </tr>
            )
        })
    }

    return (
        <section className={styles.table}>
            <h2 className={`${styles.title} dashboard_title`}>CLIENTES</h2>
            <form className={styles.table_header} onSubmit={handleSubmit(searchData)}>
                <SearchBar
                    control={control}
                    fieldName='search'
                    placeholder='Pesquisar por ID, nome, e-mail e número de documento…'
                    fetching={fetching}
                />
                <TableSelectInput
                    options={selectOptions}
                    fieldName='type'
                    control={control}
                />
                <CustomButton onClick={goTo} title='NOVO CADASTRO' icon={EIconCustomButton.MdCreateNewFolder} type='button' />
            </form>
            <table className='table_style'>
                <thead >
                    <tr>
                        <th>
                            Nome
                        </th>
                        <th>
                            Nome da empresa
                        </th>
                        <th>
                            CPF/CNPJ
                        </th>
                        <th>
                            E-mail
                        </th>
                        <th>
                            Celular
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        _renderItem(users)
                    }
                </tbody>
            </table>
        </section>
    )
}