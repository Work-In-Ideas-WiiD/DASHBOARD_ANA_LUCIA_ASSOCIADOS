import styles from './styles.module.scss';
import ReactInputMask, { Props } from 'react-input-mask';

interface ICustomInputMask extends Props {
    title: string,
    placeholder?: string,
    errorMsg?: string,
    containerClass?: string,
    mask: string;
}

export function CustomInputMask({ title, placeholder, errorMsg, containerClass, mask, ...rest }: ICustomInputMask) {
    return (
        <div className={`${styles.input_wrapper} ${containerClass}`}>
            <label>{title}</label>
            <ReactInputMask
                mask={mask}
                {...rest} />
            {errorMsg && <span className={styles.error_msg}>msg de erro</span>}
        </div>
    )
}