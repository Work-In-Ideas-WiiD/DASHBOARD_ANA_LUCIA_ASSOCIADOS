import styles from './styles.module.scss';
import { CustomButton, EIconCustomButton } from "../../../../components/customButton";
import { SearchBar } from '../../../../components/inputs/searchBar';
import { useEffect, useState } from 'react';
import { TableSelectInput } from '../../../../components/inputs/tableSelectInput';
import { StatusBadge } from '../../../../components/statusBadge/statusBadge';
import { TableCustomButton } from '../../../../components/tableCustomButton';
import { useNavigate } from 'react-router-dom';
import * as zod from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getContratos } from '../../../../services/http/contratos';
import { IGetContratosDataRes } from '../../../../services/http/contratos/contratos.dto';

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
export function ContratosTable() {

    const [fetching, setFetching] = useState(false);
    const [page, setPage] = useState(1);
    const [contracts, setContracts] = useState<IGetContratosDataRes[]>([]);
    const navigate = useNavigate();
    const { handleSubmit, control } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: '',
        }
    })


    useEffect(() => {
        getData(page);
    }, [])

    async function getData(pageParam: number, likeParam: string = "") {
        try {
            setFetching(true);
            const { data } = await getContratos(pageParam, likeParam);
            setContracts(data.data);
            setFetching(false);
        } catch (error) {
            setFetching(false);
            console.log(error);
        }
    }

    async function searchData(_data: TFormSchema) {
        await getData(page, _data.search);
    }

    function navigateTo() {
        navigate('novo');
    }

    function _renderItem(data: IGetContratosDataRes[]) {
        return data.map((item) => {

            const assinado = setIsSigned(item);

            return (
                <tr>
                    <td>{item.empresa.nome} </td>
                    <td>{item.empresa.cnpj}</td>
                    <td><StatusBadge status={assinado} /></td>
                    <td><TableCustomButton title='Enviar para empresa' /></td>
                </tr>
            )
        })
    }

    function setIsSigned(data: IGetContratosDataRes) {
        for (let cliente of data.clientes) {
            if (cliente.has_signed == false) {
                return "Pendente";
            }
        }

        return "Assinado";
    }

    return (

        <section className={styles.table}>
            <h2 className={`${styles.title} dashboard_title`}>CONTRATOS</h2>
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
                <CustomButton onClick={navigateTo} title='NOVO CADASTRO' icon={EIconCustomButton.MdCreateNewFolder} type='button' />
            </form>
            <table className='table_style'>
                <thead >
                    <tr>
                        <th>
                            Contrato
                        </th>
                        <th>
                            Empresa
                        </th>
                        <th>
                            Status
                        </th>
                        <th>
                            Ações
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {_renderItem(contracts)}
                </tbody>
            </table>
        </section>
    )
}