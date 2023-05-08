import styles from './styles.module.scss';

interface ITableCustomButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
}

export function TableCustomButton({ title, ...rest }: ITableCustomButton) {
    return (
        <button className={styles.button} {...rest}>{title}</button>
    )
}