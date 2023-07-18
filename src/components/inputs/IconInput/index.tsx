import { Control, Controller } from 'react-hook-form';
import styles from './styles.module.scss';
export interface IIconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type: string;
    icon?: "login" | "password" | "building";
    inputClass?: string;
    fieldName: string;
    control: Control<any>
}
import { IoPersonSharp, IoLockClosed } from 'react-icons/io5';
import { FaBuilding } from 'react-icons/fa';

export function IconInput({
    type = "text",
    icon = "login",
    inputClass,
    fieldName,
    control,
    ...rest
}: IIconInputProps) {

    function returnIcon(icon: string) {
        switch (icon) {
            case 'login':
                return (<IoPersonSharp className={styles.icon} size="22" />)
            case 'password':
                return (<IoLockClosed className={styles.icon} size="22" />)
            case 'building':
                return (<FaBuilding className={styles.icon} size="22" />)
            default:
                break
        }
    }

    return (
        <Controller
            name={fieldName}
            control={control}
            render={({ field }) => {
                return (
                    <div className={`${styles.input_container} ${inputClass}`}>
                        {returnIcon(icon)}
                        <input
                            value={field.value}
                            onChange={field.onChange}
                            type={type}
                            {...rest} />
                    </div>
                )
            }}
        />

    )
}