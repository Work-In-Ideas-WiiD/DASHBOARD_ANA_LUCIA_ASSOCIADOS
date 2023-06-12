import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { EIcons, HomeInfoCardComponent } from '../../../components/homeInfoCard';
import { HomeTable } from './HomeTable';
import { getStats } from '../../../services/http/home';
import { IGetStatsRes } from '../../../services/http/home/home.dto';
import { toast } from 'react-toastify';

export function HomePage() {

    const [stats, setStats] = useState<IGetStatsRes>({
        assinaturas: "0",
        clientes: "0",
        contratos: "0",
        empresas: "0"
    });

    useEffect(() => {
        //getData();
    }, [])

    async function getData() {
        try {
            const { data } = await getStats();
            setStats(data);
        } catch (error) {
            console.log(error);
            toast.error("Ocorreu um erro ao obter dados.");
        }
    }

    return (
        <main className={`${styles.main} dashboard_padding`}>
            <h2 className={`${styles.title} dashboard_title`}>home</h2>
            <section className={styles.info_cards}>
                <HomeInfoCardComponent
                    icon={EIcons.FaBuilding}
                    title='EMPRESAS CADASTRADAS'
                    value={stats.empresas}
                />
                <HomeInfoCardComponent
                    icon={EIcons.IoPersonSharp}
                    title='CLIENTES IMPACTADOS'
                    value={stats.clientes}
                />
                <HomeInfoCardComponent
                    icon={EIcons.IoDocument}
                    title='CONTRATOS'
                    value={stats.contratos}
                />
                <HomeInfoCardComponent
                    icon={EIcons.FaPenAlt}
                    title='ASSINATURAS'
                    value={stats.assinaturas}
                />
            </section>
            <HomeTable />
        </main>
    )
}