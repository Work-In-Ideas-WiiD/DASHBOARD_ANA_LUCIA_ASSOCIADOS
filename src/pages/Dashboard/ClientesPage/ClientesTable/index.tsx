import styles from './styles.module.scss';
import { CustomButton, EIconCustomButton } from "../../../../components/customButton";
import { SearchBar } from '../../../../components/inputs/searchBar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as zod from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IUserReqProps } from '../../../../services/http/user/user.dto';
import { delCliente, getClientes } from '../../../../services/http/clientes';
import { IGetClientesDataRes } from '../../../../services/http/clientes/cliente.dto';
import { TableEmptyMessage } from '../../../../components/tableEmptyMessage';
import { formatCnpjCpf } from '../../../../utils/formatCpfCnpj';
import { TablePaginator } from '../../../../components/tablePaginator';
import { FaPenAlt, FaTrash } from 'react-icons/fa';
import { BsEyeFill } from 'react-icons/bs';
import { useAuth } from '../../../../hooks/useAuth';
import { ModaDeleteCustomer } from './components/modalDeleteCustomer';
import { toast } from 'react-toastify';

const formSchema = zod.object({
    search: zod.string(),
});

type TFormSchema = zod.infer<typeof formSchema>;

export function ClienteTable() {
    const navigate = useNavigate();
    const { userRole, handleFetching } = useAuth();
    const [fetching, setFetching] = useState(false);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(0);
    const [modalRemoveItem, setModalRemoveItem] = useState(false);
    const [currentCustomer, setCurrentCustomer] = useState<IGetClientesDataRes>({
        id: "",
        nome: ""
    } as IGetClientesDataRes);
    const [noContent, setNoContent] = useState(false);
    const [customers, setCustomers] = useState<IGetClientesDataRes[]>([]);
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
            const { data } = await getClientes(pageParam, likeParam);
            setPages(data.from);
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

    async function removeCustomer(id: string) {
        setModalRemoveItem(false);
        try {
            handleFetching(true);
            await delCliente(id);
            toast.success("Cliente excluído.");
            getData(page, getValues("search"));
            handleFetching(false);
        } catch (error) {
            handleFetching(false);
            toast.error("Erro ao deletar cliente.");
        }
    }

    function _renderItem(itens: IUserReqProps[]) {

        function _handleRemoveBnt(customer: IUserReqProps) {
            setCurrentCustomer(customer);
            setModalRemoveItem(true);
        }

        function _renderButtons(item: IUserReqProps) {
            if (userRole.includes("administrador")) {
                return (
                    <>
                        <td>
                            <div className={styles.action_btn_container}>
                                <button
                                    type='button'
                                    className={styles.action_button}
                                    onClick={() => { navigate(`visualizar/${item.id}`) }}
                                >
                                    <BsEyeFill fill="#C7633B" size={19} />
                                </button>
                            </div>
                        </td>
                    </>
                )
            }

            return (
                <>
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
                </>

            )
        }

        return itens.map((item) => {

            let documentId = item.cpf ? formatCnpjCpf(item.cpf!) : formatCnpjCpf(item.cnpj!);
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
                    {_renderButtons(item)}
                </tr>
            )
        })
    }

    return (
        <section className={styles.table}>
            <ModaDeleteCustomer
                handleDelete={removeCustomer}
                handleModal={setModalRemoveItem}
                show={modalRemoveItem}
                customer={currentCustomer}

            />
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
                        {
                            !userRole.includes("administrador") && (<th>Ações</th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        _renderItem(customers)
                    }
                </tbody>
            </table>
            <TableEmptyMessage show={noContent} />
            <TablePaginator pageCount={pages} onPageChange={setPage} />
        </section>
    )
}