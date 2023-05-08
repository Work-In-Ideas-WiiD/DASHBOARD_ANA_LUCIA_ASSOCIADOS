import styles from './styles.module.scss';

interface ICustomCheckbox extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
}

export function CustomCheckbox({ id, ...rest }: ICustomCheckbox) {
    return (
        <div className={styles.container}>
            <input className='chk' id={id} type="checkbox" {...rest} />
            <label htmlFor={id}></label>
        </div>
    )
}