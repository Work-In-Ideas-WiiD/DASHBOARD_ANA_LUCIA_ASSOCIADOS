
import styles from './styles.module.scss';

interface IAssinaturaFormSteperProps {
    active: 1 | 2
}

export function AssinaturaFormSteper({ active = 1 }: IAssinaturaFormSteperProps) {

    if (active == 1) {
        return (
            <div className={styles.steper_container} data-testid="steper1">
                <div className={`${styles.steper_active} ${styles.first}`}></div>
                <div className={`${styles.steper} ${styles.last}`}></div>
                <div className={styles.line}></div>
                <span className={`${styles.text_active} ${styles.first}`}>Dados</span>
                <span className={`${styles.text} ${styles.last_text}`}>Token</span>
            </div>
        )
    }

    if (active == 2) {
        return (
            <div className={styles.steper_container} data-testid="steper2">
                <div className={`${styles.steper_active} ${styles.first}`}></div>
                <div className={`${styles.steper_active} ${styles.last}`}></div>
                <div className={styles.line}></div>
                <span className={`${styles.text_active} ${styles.first}`}>Dados</span>
                <span className={`${styles.text_active} ${styles.last_text}`}>Token</span>
            </div>
        )
    }

    return (
        <></>
    )

}