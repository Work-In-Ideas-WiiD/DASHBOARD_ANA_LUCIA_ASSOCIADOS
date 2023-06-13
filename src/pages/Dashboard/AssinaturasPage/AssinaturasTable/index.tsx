import styles from './styles.module.scss';
import { StatusBadge } from '../../../../components/statusBadge/statusBadge';
import { TableCustomButton } from '../../../../components/tableCustomButton';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../../../../components/inputs/searchBar';
import * as zod from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { getAssinaturas } from '../../../../services/http/assinaturas';
import { TableEmptyMessage } from '../../../../components/tableEmptyMessage';


const formSchema = zod.object({
    search: zod.string(),
    type: zod.object({
        value: zod.string(),
        label: zod.string()
    })
});

type TFormSchema = zod.infer<typeof formSchema>;


export function AssinaturasTable() {

    const [fetching, setFetching] = useState(false);
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [signatures, setSignatures] = useState([]);
    const [noContent, setNoContent] = useState(false);
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
            const { data } = await getAssinaturas(pageParam, likeParam);
            setSignatures(data.data);
            setNoContent(data.data.length == 0);
            setFetching(false);
        } catch (error) {
            setFetching(false);
            console.log(error);
        }
    }

    function handleNavigate() {
        navigate("/assinatura/cadastro");
    }

    async function searchData(_data: TFormSchema) {
        await getData(page, _data.search);
    }

    return (
        <section className={styles.table}>
            <form className={styles.table_header} onSubmit={handleSubmit(searchData)}>
                <SearchBar
                    control={control}
                    fieldName='search'
                    placeholder='Pesquisar por ID, nome, e-mail e número de documento…'
                    fetching={fetching}
                />
            </form>
            <table className='table_style'>
                <thead >
                    <tr>
                        <th>
                            Nome da empresa
                        </th>
                        <th>
                            Nome do cliente final
                        </th>
                        <th>
                            Status - Empresa
                        </th>
                        <th>
                            Status - Cliente
                        </th>
                        <th>
                            Data do envio
                        </th>
                        <th colSpan={2}>
                            Ações
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td onClick={handleNavigate} className='pointer'>Clínica Médica Nobel S.A  </td>
                        <td>Allan Ferreira Neto </td>
                        <td><StatusBadge status='Assinado' /></td>
                        <td><StatusBadge status='Assinado' /></td>
                        <td>27/01/2023</td>
                        <td><TableCustomButton title='Reenviar e-mails' /></td>
                        <td>
                            <button
                                type='button'
                                className={styles.delete_button}
                            >
                                <FaTrash color="#D64646" size={19} />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <TableEmptyMessage show={noContent} />
        </section>
    )
}