import styles from './styles.module.scss';

export function TableEmptyMessage({ show = false }) {

    if (!show) {
        return <></>
    }
    return (
        <div className={styles.container}>
            <h2>Não possue registros</h2>
        </div>
    )
}