import { useEffect, useState } from "react";
import { Modal } from "../../../../../components/modal";
import styles from './styles.module.scss';
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { IUserReqProps } from "../../../../../services/http/user/user.dto";
import { SearchBar } from "../../../../../components/inputs/searchBar";
import { CustomButton, EIconCustomButton } from "../../../../../components/customButton";
import { TableEmptyMessage } from "../../../../../components/tableEmptyMessage";
import { IGetEmpresasDataRes } from "../../../../../services/http/empresas/empresas.dto";
import { getEmpresas } from "../../../../../services/http/empresas";
import { TablePaginator } from "../../../../../components/tablePaginator";

interface IProps {
    handleModal(option: boolean): void,
    showModal: boolean,
    handleSubmitForm(companyId: string[]): Promise<void>
}
const formSchema = zod.object({
    search: zod.string(),
    companyId: zod.string().array()
});

type TFormSchema = zod.infer<typeof formSchema>;

export function ModalAddCompany({ handleModal, showModal, handleSubmitForm }: IProps) {

    const [fetching, setFetching] = useState(false);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(0);
    const [noContent, setNoContent] = useState(false);
    const [companies, setCompanies] = useState<IGetEmpresasDataRes[]>([]);
    const { handleSubmit, control, setValue, getValues } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: '',
            companyId: []
        }
    });

    useEffect(() => {
        getData(page, getValues("search"));
    }, [page]);

    function handleChks(id: string) {
        const values = getValues("companyId");

        const isIn = values.includes(id);
        if (isIn) {
            const newArr = values.filter((item) => item != id);
            setValue("companyId", newArr);
        } else {
            values.push(id);
            setValue("companyId", values);
        }
    }


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


    function _renderItem(itens: IGetEmpresasDataRes[]) {
        return itens.map((item) => {

            let documentId = item.cnpj ? item.cnpj : item.cpf;
            if (!item.cnpj && !item.cpf) documentId = "n/a";
            const email = item.email ? item.email : 'n/a';

            return (
                <tr key={item.id}>
                    <td>
                        <Controller
                            name="companyId"
                            control={control}
                            render={({ field }) => {
                                return (
                                    <input
                                        checked={field.value.includes(item.id)}
                                        type="checkbox"
                                        onClick={() => { handleChks(item.id) }}
                                    />
                                )
                            }}
                        />
                    </td>
                    <td>{item.nome} </td>
                    <td>{documentId}</td>
                    <td>{email}</td>
                    <td>{item.contato}</td>
                </tr>
            )
        })
    }

    function handleSendData(_data: TFormSchema) {
        if (_data.companyId.length == 0) {
            return
        }
        handleSubmitForm(_data.companyId);
        handleModal(false);
    }

    if (!showModal) {
        return <></>
    }

    return (
        <Modal title="Adicionar empresa" handleModal={handleModal} >
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
                            _renderItem(companies)
                        }
                    </tbody>
                </table>
                <TableEmptyMessage show={noContent} />
                <TablePaginator pageCount={pages} onPageChange={setPage} />
            </div>
        </Modal>
    )
}