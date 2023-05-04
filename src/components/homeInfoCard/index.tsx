import styles from './styles.module.scss';
import { FaBuilding, FaPenAlt } from 'react-icons/fa';
import { IoDocument } from 'react-icons/io5';
import { IoPersonSharp } from 'react-icons/io5';

const Icons = {
    0: <FaBuilding fill="#1E3F49" size={25} />,
    1: <FaPenAlt fill="#1E3F49" size={25} />,
    2: <IoDocument fill="#1E3F49" size={25} />,
    3: <IoPersonSharp fill="#1E3F49" size={25} />
}

export enum EIcons {
    FaBuilding = 0,
    FaPenAlt,
    IoDocument,
    IoPersonSharp
}

interface IHomeInfoCardComponentProps {
    title: string,
    icon: EIcons,
    value: string
}

export function HomeInfoCardComponent({
    title,
    icon,
    value
}: IHomeInfoCardComponentProps) {

    return (
        <div className={styles.card}>

            <div className={styles.icon_container}>
                {Icons[icon]}
            </div>
            <div className={styles.text_wrapper}>
                <label className={styles.title}>{title}</label>
                <label className={styles.value}>{value}</label>
            </div>

        </div>
    )
}