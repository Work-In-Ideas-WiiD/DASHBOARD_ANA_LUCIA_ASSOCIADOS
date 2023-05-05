import styles from './styles.module.scss';

type TStatus = "Assinado" | "Pendente";

interface IStatusBadgeProps {
    status: TStatus
}

export function StatusBadge({ status }: IStatusBadgeProps) {

    return (
        <span className={`${styles.badge} ${styles[status]}`}>
            {status}
        </span>
    )
}