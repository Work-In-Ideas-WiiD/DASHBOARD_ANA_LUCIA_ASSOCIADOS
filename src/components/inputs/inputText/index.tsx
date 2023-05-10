import styles from './styles.module.scss';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

export interface IInputText extends React.InputHTMLAttributes<HTMLInputElement> {
    title: string,
    placeholder?: string,
    type?: string,
    errorMsg?: string | null,
    containerClass?: string,
    fieldName: string,
    control: Control<any>,
    errors: FieldErrors
}

export function InputText({
    title,
    placeholder,
    type,
    errorMsg,
    containerClass,
    fieldName,
    control,
    errors,
    ...rest
}: IInputText) {
    return (
        <Controller
            name={fieldName}
            control={control}
            render={({ field }) => {
                return (
                    <div className={`${styles.input_wrapper} ${containerClass}`}>
                        <label>{title}</label>
                        <input
                            onChange={field.onChange}
                            value={field.value}
                            type={type}
                            placeholder={placeholder}
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