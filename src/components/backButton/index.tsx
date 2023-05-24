import { IoArrowBack } from 'react-icons/io5';
import styles from './styles.module.scss';

interface IProps {
    click?: () => void;
}

export function BackButton({ click }: IProps) {

    function handlePress() {
        if (click) {
            click();
        }
    }

    return (
        <button className={styles.back_btn} onClick={handlePress}>
            <IoArrowBack color="#A7BFB0" size={34} />
        </button>
    )
}