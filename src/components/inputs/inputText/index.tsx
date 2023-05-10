import styles from './styles.module.scss';
import { Control, Controller, FieldValues } from 'react-hook-form';

export interface IInputText extends React.InputHTMLAttributes<HTMLInputElement> {
    title: string,
    placeholder?: string,
    type?: string,
    errorMsg?: string | null,
    containerClass?: string,
    fieldName: string;
    control: Control<any>
}

export function InputText({ title, placeholder, type, errorMsg, containerClass, fieldName, control, ...rest }: IInputText) {
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
                        {errorMsg && <span className={styles.error_msg}>msg de erro</span>}
                    </div>
                )
            }}
        />

    )
}