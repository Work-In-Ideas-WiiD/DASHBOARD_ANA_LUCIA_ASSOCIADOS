import { useEffect, useState } from 'react';
import { CustomButton } from '../../../../components/customButton';
import { StatusBadge } from '../../../../components/statusBadge/statusBadge';
import { getHomeContratos } from '../../../../services/http/home';
import styles from './styles.module.scss';
import { toast } from 'react-toastify';
import { IGetHomeContratosRes } from '../../../../services/http/home/home.dto';
import { useNavigate } from 'react-router-dom';

export function HomeTable() {

    const [contracts, setContracts] = useState<IGetHomeContratosRes[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        try {
            const { data } = await getHomeContratos();
            setContracts(data);
        } catch (error) {
            console.log(error);
            toast.error("Ocorreu um erro ao obter dados.");
        }
    }

    function _renderItem(data: IGetHomeContratosRes[]) {
        return data.map((item) => {
            return (
                <tr>
                    <td>Clínica Médica Nobel S.A </td>
                    <td>Allan Ferreira Neto</td>
                    <td><StatusBadge status='Assinado' /></td>
                    <td><StatusBadge status='Assinado' /></td>
                    <td>27/01/2023</td>
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
                    </tr>
                </thead>
                <tbody>
                    {_renderItem(contracts)}
                </tbody>
            </table>
        </section>

    )
}