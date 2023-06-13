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
import { getClientes } from '../../../../services/http/clientes';
import { IGetClientesDataRes } from '../../../../services/http/clientes/cliente.dto';
import { TableEmptyMessage } from '../../../../components/tableEmptyMessage';

const formSchema = zod.object({
    search: zod.string(),
});

type TFormSchema = zod.infer<typeof formSchema>;

export function ClienteTable() {

    const [fetching, setFetching] = useState(false);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const [noContent, setNoContent] = useState(false);
    const [customers, setCustomers] = useState<IGetClientesDataRes[]>([]);
    const { handleSubmit, control } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: '',
        }
    })
    useEffect(() => {
        getData(page);
    }, []);

    async function getData(pageParam: number, likeParam: string = "") {
        try {
            setFetching(true);
            const { data } = await getClientes(pageParam, likeParam);
            setCustomers(data.data);
            setNoContent(data.data.length == 0);
            setFetching(false);
        } catch (error) {
            setFetching(false);
            console.log(error);
        }
    }

    async function searchData(_data: TFormSchema) {
        await getData(page, _data.search);
    }

    function goTo() {
        navigate("novo");
    }

    function _renderItem(itens: IUserReqProps[]) {
        return itens.map((item) => {

            let documentId = item.cnpj ? item.cnpj : item.cpf;
            if (!item.cnpj && !item.cpf) documentId = "n/a";
            const company_name = item.nome_empresa ? item.nome_empresa : 'n/a';
            const email = item.email ? item.email : 'n/a';

            return (
                <tr key={item.id}>
                    <td>{item.nome} </td>
                    <td>{company_name}</td>
                    <td>{documentId}</td>
                    <td>{email}</td>
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
                        _renderItem(customers)
                    }
                </tbody>
            </table>
            <TableEmptyMessage show={noContent} />
        </section>
    )
}