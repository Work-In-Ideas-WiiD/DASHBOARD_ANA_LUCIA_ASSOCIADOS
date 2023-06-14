import styles from './styles.module.scss';
import { CustomButton, EIconCustomButton } from "../../../../components/customButton";
import { SearchBar } from '../../../../components/inputs/searchBar';
import { useEffect, useState } from 'react';
import { TableSelectInput } from '../../../../components/inputs/tableSelectInput';
import { useNavigate } from 'react-router-dom';
import * as zod from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getAdministradores } from '../../../../services/http/administradores';
import { IGetAdministradoresDataRes } from '../../../../services/http/administradores/administradores.dto';
import { TableEmptyMessage } from '../../../../components/tableEmptyMessage';

const formSchema = zod.object({
    search: zod.string(),
});

type TFormSchema = zod.infer<typeof formSchema>;


export function AdministradoresTable() {

    const [fetching, setFetching] = useState(false);
    const [page, setPage] = useState(1);
    const [admins, setAdmins] = useState<IGetAdministradoresDataRes[]>([]);
    const [noContent, setNoContent] = useState(false);
    const navigate = useNavigate();
    const { handleSubmit, control } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: '',
        }
    });

    useEffect(() => {
        getData(page);
    }, []);

    async function getData(pageParam: number, likeParam: string = "") {
        try {
            setFetching(true);
            const { data } = await getAdministradores(pageParam, likeParam);
            setAdmins(data.data);
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
        navigate('novo');
    }

    function _renderItem(_data: IGetAdministradoresDataRes[]) {
        return _data.map((item) => {

            let documentId = item.cnpj ? item.cnpj : item.cpf;
            if (!item.cnpj && !item.cpf) documentId = "n/a";
            const email = item.email ? item.email : 'n/a';

            return (
                <tr key={item.id}>
                    <td>{item.nome} </td>
                    <td>{documentId}</td>
                    <td>{email}</td>
                    <td>Administradores - Empresa</td>
                </tr>
            )
        })
    }

    return (
        <section className={styles.table}>
            <h2 className={`${styles.title} dashboard_title`}>ADMINISTRADORES</h2>
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
                            CPF/CNPJ
                        </th>
                        <th>
                            E-mail
                        </th>
                        <th>
                            Tipo
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {_renderItem(admins)}
                </tbody>

            </table>
            <TableEmptyMessage show={noContent} />
        </section>
    )
}