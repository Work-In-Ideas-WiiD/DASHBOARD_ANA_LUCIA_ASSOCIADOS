import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomButton, EIconCustomButton } from "../../../../components/customButton";
import { SearchBar } from '../../../../components/inputs/searchBar';
import { TableCustomButton } from '../../../../components/tableCustomButton';
import { TableEmptyMessage } from '../../../../components/tableEmptyMessage';
import * as zod from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../../hooks/useAuth';
import { toast } from 'react-toastify';
import { postAddEmpresaToContratoOrArquivo } from '../../../../services/http/administradores';
import { MdDownload } from "react-icons/md";
import { openFile } from '../../../../utils/openFIle';
import { delArquivo, getArquivos } from '../../../../services/http/arquivos';
import { ModalAddCompany } from '../components/modalAddCompany';
import { IGetArquivosDataRes } from '../../../../services/http/arquivos/aquivos.dto';
import { TablePaginator } from '../../../../components/tablePaginator';
import { formatCnpjCpf } from '../../../../utils/formatCpfCnpj';
import { FaTrash } from 'react-icons/fa';
import { ModaDeleteArquivo } from './components/modalDeleteArquivo';

const formSchema = zod.object({
    search: zod.string(),
    fileId: zod.string()
});

type TFormSchema = zod.infer<typeof formSchema>;

export function ArquivosTable() {
    const { isAdmin, handleFetching } = useAuth();
    const [fetching, setFetching] = useState(false);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [noContent, setNoContent] = useState(false);
    const [files, setFiles] = useState<IGetArquivosDataRes[]>([]);
    const [currentFile, setCurrentFile] = useState<IGetArquivosDataRes>()
    const navigate = useNavigate();
    const { handleSubmit, control, getValues } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: '',
            fileId: ''
        }
    })
    const [modalRemoveItem, setModalRemoveItem] = useState(false);
    const [delFileData, setDelFileDate] = useState<IGetArquivosDataRes>({
        id: "",
        descricao: ""
    } as IGetArquivosDataRes);

    useEffect(() => {
        getData(page, getValues("search"));
    }, [page])

    function handleModal(option: boolean) {
        setModalIsOpen(option);
    }

    async function getData(pageParam: number, likeParam: string = "") {
        try {
            setFetching(true);
            const { data } = await getArquivos(pageParam, likeParam);
            setPages(data.from);
            setFiles(data.data);
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

    function navigateTo() {
        navigate('novo');
    }

    async function removeFile(id: string) {
        setModalRemoveItem(false);
        try {
            handleFetching(true);
            await delArquivo(id);
            toast.success("Arquivo excluído.");
            getData(page, getValues("search"));
            handleFetching(false);
        } catch (error) {
            handleFetching(false);
            toast.error("Erro ao deletar arquivo.");
        }
    }

    function _renderItem(data: IGetArquivosDataRes[]) {

        function renderButton(data: IGetArquivosDataRes) {
            if (!isAdmin) {
                return (<></>)
            }

            if (data.empresa?.cnpj) {
                return (<></>)
            }
            return (
                <TableCustomButton title={"enviar para empresa"} onClick={() => { checkBtnAction(data) }} />
            )

        }

        function _handleRemoveBnt(file: IGetArquivosDataRes) {
            setDelFileDate(file);
            setModalRemoveItem(true);
        }

        return data.map((item) => {

            const cnpj_empresa = item.empresa ? formatCnpjCpf(item.empresa.cnpj!) : 'n/a';
            const company_name = item.empresa && item.empresa.nome_empresa ? item.empresa.nome_empresa : 'n/a';
            return (
                <tr key={item.id}>
                    <td>{item.descricao} </td>
                    <td>{company_name} </td>
                    <td>{cnpj_empresa}</td>
                    <td>
                        {renderButton(item)}
                    </td>
                    <td>
                        <div className={styles.action_btn_container}>
                            <button
                                type='button'
                                className={styles.action_button}
                                onClick={() => { openFile(item.url) }}
                            >
                                <MdDownload color="#C7633B" size={19} />
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

    async function checkBtnAction(contract: IGetArquivosDataRes) {
        setCurrentFile(contract);
        handleModal(true);
    }

    async function handleAddCompanyToFile(companyId: string) {
        const file = currentFile!;
        await addCompanyToFile(file.id, companyId);
        await getData(page);
    }

    async function addCompanyToFile(fileId: string, companyId: string) {
        try {
            setFetching(true);
            await postAddEmpresaToContratoOrArquivo(companyId, fileId);
            toast.success("Arquivo enviado");
            setFetching(false);

        } catch (error) {
            setFetching(false);
            toast.error("Falha ao enviar arquivo");
        }
    }

    function renderAdminOptions(value: boolean) {

        if (value) {
            return (
                <CustomButton
                    onClick={navigateTo}
                    title='NOVO CADASTRO'
                    icon={EIconCustomButton.MdCreateNewFolder}
                    type='button'
                />
            )
        }
        return (
            <></>
        )
    }

    return (

        <section className={styles.table}>
            <ModaDeleteArquivo
                handleDelete={removeFile}
                handleModal={setModalRemoveItem}
                show={modalRemoveItem}
                file={delFileData}
            />
            <ModalAddCompany handleSubmitForm={handleAddCompanyToFile} showModal={modalIsOpen} handleModal={handleModal} />
            <h2 className={`${styles.title} dashboard_title`}>ARQUIVOS</h2>
            <form className={styles.table_header} onSubmit={handleSubmit(searchData)}>
                <SearchBar
                    control={control}
                    fieldName='search'
                    placeholder='Pesquisar por ID, nome, e-mail e número de documento…'
                    fetching={fetching}
                />
                {renderAdminOptions(isAdmin)}
            </form>
            <table className='table_style'>
                <thead >
                    <tr>
                        <th>
                            Arquivo
                        </th>
                        <th>
                            Empresa
                        </th>
                        <th>
                            CNPJ
                        </th>
                        <th colSpan={2}>
                            Ações
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {_renderItem(files)}
                </tbody>
            </table>
            <TableEmptyMessage show={noContent} />
            <TablePaginator pageCount={pages} onPageChange={setPage} />
        </section>
    )
}