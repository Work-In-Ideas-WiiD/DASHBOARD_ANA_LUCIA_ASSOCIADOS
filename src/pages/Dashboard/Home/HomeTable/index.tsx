import { useEffect, useState } from 'react';
import { CustomButton } from '../../../../components/customButton';
import { StatusBadge } from '../../../../components/statusBadge/statusBadge';
import { getHomeContratos } from '../../../../services/http/home';
import styles from './styles.module.scss';
import { toast } from 'react-toastify';
import { IGetHomeContratosRes } from '../../../../services/http/home/home.dto';
import { useNavigate } from 'react-router-dom';
import { TableEmptyMessage } from '../../../../components/tableEmptyMessage';

export function HomeTable() {

    const [contracts, setContracts] = useState<IGetHomeContratosRes[]>([]);
    const navigate = useNavigate();
    const [noContent, setNoContent] = useState(false);

    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        try {
            const { data } = await getHomeContratos();
            setContracts(data);
            setNoContent(data.length == 0);
        } catch (error) {
            console.log(error);
            toast.error("Ocorreu um erro ao obter dados.");
        }
    }

    function checkSignature(data: IGetHomeContratosRes, param: "cliente" | "empresa") {
        if (data.assinantes.length == 0) {
            return "Pendente";
        }

        const index = data.assinantes.findIndex((item) => item.tipo == param && item.has_signed);

        if (index == -1) {
            return "Pendente";
        }

        return "Assinado"
    }

    function checkName(data: IGetHomeContratosRes, param: "cliente" | "empresa") {
        if (data.assinantes.length == 0) {
            return "n/a";
        }

        const index = data.assinantes.findIndex((item) => item.tipo == param);

        if (index == -1) {
            return "n/a";
        }

        return data.assinantes[index].dados.nome;
    }

    function _renderItem(data: IGetHomeContratosRes[]) {
        return data.map((item) => {

            const statusSignatureCustomer = checkSignature(item, "cliente");
            const statusSignatureCompany = checkSignature(item, "empresa");
            const signatureDate = new Date(item.updated_at).toLocaleDateString();
            return (
                <tr key={item.id}>
                    <td>{item.descricao}</td>
                    <td>{checkName(item, "empresa")}</td>
                    <td>{checkName(item, "cliente")}</td>
                    <td><StatusBadge status={statusSignatureCompany} /></td>
                    <td><StatusBadge status={statusSignatureCustomer} /></td>
                    <td>{signatureDate}</td>
                </tr>
            )
        })
    }

    function navigateTo() {
        navigate("/dashboard/contratos");
    }

    return (
        <section className={styles.table}>
            <div className={styles.table_header}>
                <label className={styles.table_title}>CONTRATOS</label>
                <CustomButton title='VER TUDO' onClick={navigateTo} />
            </div>
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
                            Nome do cliente
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