import { RotatingLines } from 'react-loader-spinner';
import styles from './styles.module.scss';
import { FiSearch } from 'react-icons/fi';
import { Control, Controller } from 'react-hook-form';

export interface ISearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
    fetching: boolean;
    fieldName: string;
    control: Control<any>
}

export function SearchBar({
    fetching,
    fieldName,
    control,
    ...rest
}: ISearchBarProps) {

    function isFetching(fetching: boolean) {
        if (fetching) {
            return (
                <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="1.00"
                    width="24"
                    visible={true}
                />
            )
        }
        return (
            <button type='submit' className={styles.search_btn}>
                <FiSearch className={styles.search_icon} size={24} color="#1E3F49" />
            </button>)
    }

    return (
        <Controller
            name={fieldName}
            control={control}
            render={({ field }) => {
                return (
                    <div className={styles.searchbar}>
                        {
                            isFetching(fetching)
                        }
                        <input
                            value={field.value}
                            onChange={field.onChange}
                            type="text"
                            {...rest} />
                    </div>
                )
            }}
        />
    )
}