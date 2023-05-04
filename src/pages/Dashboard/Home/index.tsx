import { EIcons, HomeInfoCardComponent } from '../../../components/homeInfoCard';
import { HomeTable } from './HomeTable';
import styles from './styles.module.scss';

export function HomePage() {
    return (
        <main className={`${styles.main} dashboard_padding`}>
            <h2 className={`${styles.title} dashboard_title`}>home</h2>
            <section className={styles.info_cards}>
                <HomeInfoCardComponent
                    icon={EIcons.FaBuilding}
                    title='EMPRESAS CADASTRADAS'
                    value='78'
                />
                <HomeInfoCardComponent
                    icon={EIcons.IoPersonSharp}
                    title='CLIENTES IMPACTADOS'
                    value='985'
                />
                <HomeInfoCardComponent
                    icon={EIcons.IoDocument}
                    title='CONTRATOS'
                    value='350'
                />
                <HomeInfoCardComponent
                    icon={EIcons.FaPenAlt}
                    title='ASSINATURAS'
                    value='700'
                />
            </section>
            <HomeTable />
        </main>
    )
}