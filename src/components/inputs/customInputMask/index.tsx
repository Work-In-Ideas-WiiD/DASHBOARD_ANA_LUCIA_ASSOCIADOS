import { Control, Controller, FieldErrors } from 'react-hook-form';
import styles from './styles.module.scss';
import ReactInputMask, { Props } from 'react-input-mask';
import { ErrorMessage } from '@hookform/error-message';

interface ICustomInputMask extends Props {
    title: string,
    placeholder?: string,
    errorMsg?: string | null,
    containerClass?: string,
    mask: string;
    fieldName: string,
    control: Control<any>,
    errors: FieldErrors
}

export function CustomInputMask({
    title,
    placeholder,
    errorMsg,
    containerClass,
    mask,
    fieldName,
    control,
    errors,
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
                        <ErrorMessage
                            errors={errors}
                            name={fieldName}
                            render={({ message }) => {
                                return (
                                    <span className={styles.error_msg}>{message}</span>
                                )
                            }}

                        />
                    </div>
                )
            }}
        />
    )
}