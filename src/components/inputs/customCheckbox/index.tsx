import styles from './styles.module.scss';
import { Control, Controller } from 'react-hook-form';


interface ICustomCheckbox extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    fieldName: string;
    control: Control<any>
}

export function CustomCheckbox({ id, fieldName, control, ...rest }: ICustomCheckbox) {
    return (
        <Controller
            name={fieldName}
            control={control}
            render={({ field }) => {
                return (
                    <div className={styles.container}>
                        <input
                            checked={field.value}
                            onChange={field.onChange}
                            className='chk'
                            id={id}
                            type="checkbox"
                            {...rest}
                        />
                        <label htmlFor={id}></label>
                    </div>
                )
            }}
        />

    )
}