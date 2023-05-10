import { Control, Controller, FieldValues } from 'react-hook-form';
import styles from './styles.module.scss';
import ReactInputMask, { Props } from 'react-input-mask';

interface ICustomInputMask extends Props {
    title: string,
    placeholder?: string,
    errorMsg?: string | null,
    containerClass?: string,
    mask: string;
    fieldName: string;
    control: Control<any>
}

export function CustomInputMask({
    title,
    placeholder,
    errorMsg,
    containerClass,
    mask,
    fieldName,
    control,
    ...rest
}: ICustomInputMask) {
    return (
        <Controller
            name={fieldName}
            control={control}
            render={({ field }) => {
                return (
                    <div className={`${styles.input_wrapper} ${containerClass}`}>
                        <label>{title}</label>
                        <ReactInputMask
                            value={field.value}
                            onChange={field.onChange}
                            mask={mask}
                            {...rest}
                        />
                        {errorMsg && <span className={styles.error_msg}>msg de erro</span>}
                    </div>
                )
            }}
        />
    )
}