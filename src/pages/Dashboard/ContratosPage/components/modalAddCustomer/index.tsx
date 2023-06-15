import { useEffect, useState } from "react";
import { Modal } from "../../../../../components/modal";
import styles from './styles.module.scss';
import { getClientes } from "../../../../../services/http/clientes";
import { IGetClientesDataRes } from "../../../../../services/http/clientes/cliente.dto";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { IUserReqProps } from "../../../../../services/http/user/user.dto";
import { SearchBar } from "../../../../../components/inputs/searchBar";
import { CustomButton, EIconCustomButton } from "../../../../../components/customButton";
import { TableEmptyMessage } from "../../../../../components/tableEmptyMessage";

interface IProps {
    handleModal(option: boolean): void,
    showModal: boolean,
}
const formSchema = zod.object({
    search: zod.string(),
    customerId: zod.string()
});

type TFormSchema = zod.infer<typeof formSchema>;

export function ModalAddCustomer({ handleModal, showModal }: IProps) {

    const [fetching, setFetching] = useState(false);
    const [page, setPage] = useState(1);
    const [noContent, setNoContent] = useState(false);
    const [customers, setCustomers] = useState<IGetClientesDataRes[]>([]);
    const { handleSubmit, control, setValue } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: '',
            customerId: ''
        }
    });

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


    function _renderItem(itens: IUserReqProps[]) {
        return itens.map((item) => {

            let documentId = item.cnpj ? item.cnpj : item.cpf;
            if (!item.cnpj && !item.cpf) documentId = "n/a";
            const email = item.email ? item.email : 'n/a';

            return (
                <tr key={item.id}>
                    <Controller
                        name="customerId"
                        control={control}
                        render={({ field }) => {
                            return (
                                <input
                                    checked={field.value == item.id}
                                    type="checkbox"
                                    onClick={() => { setValue("customerId", item.id) }}
                                />
                            )
                        }}
                    />
                    <td>{item.nome} </td>
                    <td>{documentId}</td>
                    <td>{email}</td>
                    <td>{item.contato}</td>
                </tr>
            )
        })
    }

    function handleSendData(_data: TFormSchema) {
        console.log("test");

    }

    if (!showModal) {
        return <></>
    }

    return (
        <Modal title="Adicionar cliente" handleModal={handleModal} >
            <div className={styles.table}>
                <form className={styles.table_header} onSubmit={handleSubmit(searchData)}>
                    <SearchBar
                        control={control}
                        fieldName='search'
                        placeholder='Pesquisar por ID, nome, e-mail e número de documento…'
                        fetching={fetching}
                    />
                    <CustomButton onClick={handleSubmit(handleSendData)} title='Adicionar' icon={EIconCustomButton.IoPersonSharp} type='button' />
                </form>
                <table className='table_style'>
                    <thead>
                        <tr>
                            <th>
                                Ação
                            </th>
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
            </div>
        </Modal>
    )
}