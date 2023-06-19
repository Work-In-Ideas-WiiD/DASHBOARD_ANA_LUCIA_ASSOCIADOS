import styles from './styles.module.scss';
import { StatusBadge } from '../../../../components/statusBadge/statusBadge';
import { TableCustomButton } from '../../../../components/tableCustomButton';
import { MdDownload } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../../../../components/inputs/searchBar';
import * as zod from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { getAssinaturas } from '../../../../services/http/assinaturas';
import { TableEmptyMessage } from '../../../../components/tableEmptyMessage';
import { IGetAssinaturasData } from '../../../../services/http/assinaturas/assinaturas.dto';
import { toast } from 'react-toastify';
import { postSendToClicksign } from '../../../../services/http/contratos';
import { openFile } from '../../../../utils/openFIle';


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
    const [signatures, setSignatures] = useState<IGetAssinaturasData[]>([]);
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
    function checkSignature(data: IGetAssinaturasData, param: "cliente" | "empresa") {
        if (data.assinantes.length == 0) {
            return "Pendente";
        }

        const index = data.assinantes.findIndex((item) => item.tipo == param && item.has_signed);

        if (index == -1) {
            return "Pendente";
        }

        return "Assinado"
    }

    function checkName(data: IGetAssinaturasData, param: "cliente" | "empresa") {
        if (data.assinantes.length == 0) {
            return "n/a";
        }

        const index = data.assinantes.findIndex((item) => item.tipo == param);

        if (index == -1) {
            return "n/a";
        }

        return data.assinantes[index].dados.nome;
    }

    async function sendContractToSign(contractId: string) {
        try {
            setFetching(true);
            await postSendToClicksign(contractId);
            toast.success("Enviado para assinatura");
            setFetching(false);
        } catch (error) {
            setFetching(false);
            toast.error("Erro ao enviar para assinatura");
        }
    }

    function renderItem(data: IGetAssinaturasData[]) {
        return data.map((item) => {

            const signatureDate = new Date(item.updated_at).toLocaleDateString();
            const statusSignatureCustomer = checkSignature(item, "cliente");
            const statusSignatureCompany = checkSignature(item, "empresa");
            const renderButton = statusSignatureCustomer == "Assinado" && statusSignatureCompany == "Assinado" ?
                <TableCustomButton title='Reenviar e-mails' onClick={() => { sendContractToSign(item.id) }} />
                : <></>;

            return (
                <tr>
                    <td>{item.descricao}</td>
                    <td>{checkName(item, "empresa")}</td>
                    <td>{checkName(item, "cliente")}</td>
                    <td><StatusBadge status={statusSignatureCompany} /></td>
                    <td><StatusBadge status={statusSignatureCustomer} /></td>
                    <td>{signatureDate}</td>
                    <td>
                        {renderButton}
                    </td>
                    <td>
                        <button
                            type='button'
                            className={styles.download_button}
                            onClick={() => { openFile(item.url) }}
                        >
                            <MdDownload color="#C7633B" size={19} />
                        </button>
                    </td>
                </tr>
            )
        })
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
                            Nome do contrato
                        </th>
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
                    {renderItem(signatures)}
                </tbody>
            </table>
            <TableEmptyMessage show={noContent} />
        </section>
    )
}