import { RotatingLines } from 'react-loader-spinner';
import styles from './styles.module.scss';
import { FiSearch } from 'react-icons/fi';

export interface ISearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
    fetching: boolean;
    handleSearch(): void;
}

export function SearchBar({ fetching, handleSearch, ...rest }: ISearchBarProps) {

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
        return (<FiSearch className={styles.search_icon} size={24} color="#1E3F49" onClick={handleSearch} />)
    }

    return (
        <div className={styles.searchbar}>
            {
                isFetching(fetching)
            }
            <input type="text" {...rest} />
        </div>
    )
}