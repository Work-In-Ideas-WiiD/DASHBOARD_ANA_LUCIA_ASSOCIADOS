import styles from './styles.module.scss';
import { CustomButton, EIconCustomButton } from "../../../../components/customButton";
import { SearchBar } from '../../../../components/inputs/searchBar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as zod from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { delEmpresa, getEmpresas } from '../../../../services/http/empresas';
import { IGetEmpresasDataRes, IGetEmpresasRes } from '../../../../services/http/empresas/empresas.dto';
import { TableEmptyMessage } from '../../../../components/tableEmptyMessage';
import { formatCnpjCpf } from '../../../../utils/formatCpfCnpj';
import { TablePaginator } from '../../../../components/tablePaginator';
import { FaPenAlt, FaTrash } from 'react-icons/fa';
import { useAuth } from '../../../../hooks/useAuth';
import { toast } from 'react-toastify';
import { ModaDeleteCompany } from './components/modalDeleteCompany';

const formSchema = zod.object({
    search: zod.string(),
});

type TFormSchema = zod.infer<typeof formSchema>;


export function EmpresasTable() {
    const navigate = useNavigate();
    const { handleFetching } = useAuth();
    const [fetching, setFetching] = useState(false);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(0);
    const [modalRemoveItem, setModalRemoveItem] = useState(false);
    const [companies, setCompanies] = useState<IGetEmpresasDataRes[]>([]);
    const [currentCompany, setCurrentCompany] = useState<IGetEmpresasDataRes>({
        id: "",
        nome: ""
    } as IGetEmpresasDataRes);
    const [noContent, setNoContent] = useState(false);
    const { handleSubmit, control, getValues } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: '',
        }
    })

    useEffect(() => {
        getData(page, getValues("search"));
    }, [page])

    async function getData(pageParam: number, likeParam: string = "") {
        try {
            setFetching(true);
            const { data } = await getEmpresas(pageParam, likeParam);
            setPages(data.from);
            setCompanies(data.data);
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

    async function removeCustomer(id: string) {
        setModalRemoveItem(false);
        try {
            handleFetching(true);
            await delEmpresa(id);
            toast.success("Empresa excluída.");
            getData(page, getValues("search"));
            handleFetching(false);
        } catch (error) {
            handleFetching(false);
            toast.error("Erro ao deletar empresa.");
        }
    }

    function _renderItem(itens: IGetEmpresasDataRes[]) {

        function _handleRemoveBnt(customer: IGetEmpresasDataRes) {
            setCurrentCompany(customer);
            setModalRemoveItem(true);
        }

        return itens.map((item) => {

            let documentId = item.cnpj ? formatCnpjCpf(item.cnpj) : formatCnpjCpf(item.cpf!);
            if (!item.cnpj && !item.cpf) documentId = "n/a";
            const company_name = item.nome_empresa ? item.nome_empresa : 'n/a';
            const email = item.email ? item.email : 'n/a';
            const phone = item.contato ? item.contato : 'n/a';
            return (
                <tr key={item.id}>
                    <td>{item.nome} </td>
                    <td>{company_name}</td>
                    <td>{documentId}</td>
                    <td>{email}</td>
                    <td>{phone}</td>
                    <td>
                        <div className={styles.action_btn_container}>
                            <button
                                type='button'
                                className={styles.action_button}
                                onClick={() => { navigate(`editar/${item.id}`) }}
                            >
                                <FaPenAlt fill="#C7633B" size={19} />
                            </button>
                            <button
                                type='button'
                                className={styles.action_button}
                                onClick={() => { _handleRemoveBnt(item) }}
                            >
                                <FaTrash fill="#D64646" size={19} />
                            </button>
                        </div>
                    </td>
                </tr>
            )
        })
    }

    return (
        <section className={styles.table}>
            <ModaDeleteCompany
                handleDelete={removeCustomer}
                handleModal={setModalRemoveItem}
                show={modalRemoveItem}
                company={currentCompany}
            />
            <h2 className={`${styles.title} dashboard_title`}>EMPRESAS</h2>
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
                        <th>
                            Ações
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        _renderItem(companies)
                    }
                </tbody>
            </table>
            <TableEmptyMessage show={noContent} />
            <TablePaginator pageCount={pages} onPageChange={setPage} />
        </section>
    )
}