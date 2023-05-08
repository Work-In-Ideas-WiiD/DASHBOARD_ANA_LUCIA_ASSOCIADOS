import styles from './styles.module.scss';

export interface IInputText extends React.InputHTMLAttributes<HTMLInputElement> {
    title: string,
    placeholder?: string,
    type?: string,
    errorMsg?: string,
    containerClass?: string
}

export function InputText({ title, placeholder, type, errorMsg, containerClass, ...rest }: IInputText) {
    return (
        <div className={`${styles.input_wrapper} ${containerClass}`}>
            <label>{title}</label>
            <input type={type} placeholder={placeholder} {...rest} />
            {errorMsg && <span className={styles.error_msg}>msg de erro</span>}
        </div>
    )
}