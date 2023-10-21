import styles from './styles.module.scss';
import Select from 'react-select';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

export interface IOptions {
    value: string,
    label: string
}

interface ICustomSelectInputProps {
    title: string,
    placeholder?: string,
    options: IOptions[];
    fieldName: string;
    control: Control<any>
    errors: FieldErrors,
    containerClass?: string,
}


export function CustomSelectInput({
    title,
    placeholder,
    options,
    fieldName,
    control,
    errors,
    containerClass
}: ICustomSelectInputProps) {
    return (
        <Controller
            name={fieldName}
            control={control}
            render={({ field }) => {
                return (

                    <div className={`${styles.input_wrapper} ${containerClass}`}>
                        <label htmlFor={fieldName}>{title}</label>
                        <Select
                            onChange={field.onChange}
                            options={options}
                            className="custom-select-container"
                            classNamePrefix="custom-select"
                            placeholder={placeholder}
                            inputId={fieldName}
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