import styles from './styles.module.scss';

export function HomeTable() {

    return (
        <section className={styles.table}>
            <div className={styles.table_header}>
                <label className={styles.table_title}>CONTRATOS</label>
                <button>VER TUDO</button>
            </div>
        </section>

    )
}