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
import { getContratos, postAddUserContract, postSendToClicksign } from '../../../../services/http/contratos';
import { IGetContratosDataRes } from '../../../../services/http/contratos/contratos.dto';
import { useAuth } from '../../../../hooks/useAuth';
import { TableEmptyMessage } from '../../../../components/tableEmptyMessage';
import { toast } from 'react-toastify';
import { postAddEmpresaToContratoOrArquivo } from '../../../../services/http/administradores';
import { ModalAddCustomer } from '../components/modalAddCustomer';

const formSchema = zod.object({
    search: zod.string(),
    type: zod.object({
        value: zod.string(),
        label: zod.string()
    }),
    contractId: zod.string()
});

type TFormSchema = zod.infer<typeof formSchema>;

interface IFindCustomerRes {
    tipo: "cliente" | "empresa",
    has_signed: boolean,
    dados: {
        nome: string,
        email: string,
        documento: string,
        contato: string,
    }
}

const selectOptions = [
    { value: 'clientes', label: 'Clientes' },
    { value: 'empresas', label: 'Empresas' },
]
export function ContratosTable() {
    const { isAdmin } = useAuth();
    const [fetching, setFetching] = useState(false);
    const [page, setPage] = useState(1);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [noContent, setNoContent] = useState(false);
    const [contracts, setContracts] = useState<IGetContratosDataRes[]>([]);
    const [currentContract, setCurrentContract] = useState<IGetContratosDataRes>()
    const navigate = useNavigate();
    const { handleSubmit, control } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: '',
            contractId: ''
        }
    })

    useEffect(() => {
        getData(page);
    }, [])

    function handleModal(option: boolean) {
        setModalIsOpen(option);
    }

    async function getData(pageParam: number, likeParam: string = "") {
        try {
            setFetching(true);
            const { data } = await getContratos(pageParam, likeParam);
            setContracts(data.data);
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

    function checkTableBtnText(data: IGetContratosDataRes) {
        if (isAdmin) {
            return "re-enviar para empresa";
        }
        if (data.assinantes.length > 1) {
            return "re-enviar para cliente";
        }
        return "enviar para cliente";
    }

    function _renderItem(data: IGetContratosDataRes[]) {
        return data.map((item) => {

            const signed = setIsSigned(item);
            const btn_text = checkTableBtnText(item);
            const nome_empresa = item.empresa ? item.empresa.nome : 'n/a';
            const cnpj_empresa = item.empresa ? item.empresa.cnpj : 'n/a';
            return (
                <tr>
                    <td>{nome_empresa} </td>
                    <td>{cnpj_empresa}</td>
                    <td><StatusBadge status={signed} /></td>
                    <td><TableCustomButton title={btn_text} onClick={() => { checkBtnAction(item) }} /></td>
                </tr>
            )
        })
    }

    async function checkBtnAction(contract: IGetContratosDataRes) {

        if (isAdmin) {
            await addCompanyToContract(contract);
        } else {
            if (contract.assinantes.length <= 1) {
                setCurrentContract(contract);
                handleModal(true);
            } else {
                await sendContractToSign(contract.id);
            }

        }
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

    async function handleSubmitContractToCustomer(customerId: string) {
        const contract = currentContract!;
        if (!contract.empresa) {
            toast.error("Falha ao re-enviar contrato");
            return
        }

        await addCustomerToContract(contract.id, customerId);
        await sendContractToSign(contract.id);
        await getData(page);
    }

    async function addCustomerToContract(contractId: string, customerId: string) {
        try {
            setFetching(true);
            await postAddUserContract(contractId, [customerId]);
            toast.success("Contrato enviado para o cliente");
            setFetching(false);

        } catch (error) {
            setFetching(false);
            toast.error("Falha ao re-enviar contrato");
        }
    }

    async function addCompanyToContract(data: IGetContratosDataRes) {
        if (fetching) {
            return
        }
        if (!data.empresa) {
            return toast.error("Falha ao re-enviar contrato");
        }
        try {
            setFetching(true);
            await postAddEmpresaToContratoOrArquivo(data.empresa.id, data.id);
            setFetching(false);
        } catch (error) {
            toast.error("Falha ao re-enviar contrato");
            setFetching(false);
        }
    }

    function setIsSigned(data: IGetContratosDataRes) {
        if (!data.empresa || data.assinantes.length <= 1) {
            return "Pendente";
        }
        for (let assiantes of data.assinantes) {
            if (assiantes.has_signed == false) {
                return "Pendente";
            }
        }

        return "Assinado";
    }

    function renderAdminOptions(value: boolean) {

        if (value) {
            return (
                <>
                    <CustomButton onClick={navigateTo} title='NOVO CADASTRO' icon={EIconCustomButton.MdCreateNewFolder} type='button' />
                </>
            )
        }
        return (
            <></>
        )
    }

    return (

        <section className={styles.table}>
            <ModalAddCustomer handleSubmitForm={handleSubmitContractToCustomer} showModal={modalIsOpen} handleModal={handleModal} />
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
                {renderAdminOptions(isAdmin)}
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
            <TableEmptyMessage show={noContent} />
        </section>
    )
}