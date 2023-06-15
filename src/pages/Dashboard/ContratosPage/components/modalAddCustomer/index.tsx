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
import { CustomButton } from "../../../../../components/customButton";
import { TableEmptyMessage } from "../../../../../components/tableEmptyMessage";
import { CustomCheckbox } from "../../../../../components/inputs/customCheckbox";
interface IProps {
    handleModal(option: boolean): void,

}
const formSchema = zod.object({
    search: zod.string(),
    customerId: zod.string()
});

type TFormSchema = zod.infer<typeof formSchema>;

export function ModalAddCustomer({ handleModal }: IProps) {

    const [fetching, setFetching] = useState(false);
    const [page, setPage] = useState(1);
    const [noContent, setNoContent] = useState(false);
    const [customers, setCustomers] = useState<IGetClientesDataRes[]>([]);
    const { handleSubmit, control, setValue } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: '',
            customerId: undefined
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
                    <td>
                        <input type="checkbox" />
                    </td>
                    <td>{item.nome} </td>
                    <td>{documentId}</td>
                    <td>{email}</td>
                    <td>{item.contato}</td>
                </tr>
            )
        })
    }

    function checkValue(id: string) {
        setValue("customerId", id);
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
                        <tr >
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>nome</td>
                            <td>222222</td>
                            <td>email@email.com</td>
                            <td>419922992-29299</td>
                        </tr>
                        <tr >
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>nome</td>
                            <td>222222</td>
                            <td>email@email.com</td>
                            <td>419922992-29299</td>
                        </tr>
                        <tr >
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>nome</td>
                            <td>222222</td>
                            <td>email@email.com</td>
                            <td>419922992-29299</td>
                        </tr>
                    </tbody>
                </table>
                <TableEmptyMessage show={noContent} />
            </div>
        </Modal>
    )
}