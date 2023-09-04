import styles from './styles.module.scss';
import { IoCloseOutline } from "react-icons/io5";

interface IProps {
    company: {
        id: string,
        name: string
    },
    remove: (id: string) => void
}

export function CompanyBadger({ company, remove }: IProps) {

    return (
        <div className={styles.badger_container}>
            <button onClick={() => { remove(company.id) }}>
                <IoCloseOutline color={"white"} />
            </button>
            <span>
                {company.name}
            </span>
        </div>
    )
}