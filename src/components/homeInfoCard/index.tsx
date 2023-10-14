import styles from './styles.module.scss';
import { FaBuilding, FaPenAlt } from 'react-icons/fa';
import { IoDocument } from 'react-icons/io5';
import { IoPersonSharp } from 'react-icons/io5';

const Icons = {
    0: <FaBuilding fill="#1E3F49" size={25} data-testid="icon1" />,
    1: <FaPenAlt fill="#1E3F49" size={25} data-testid="icon2" />,
    2: <IoDocument fill="#1E3F49" size={25} data-testid="icon3" />,
    3: <IoPersonSharp fill="#1E3F49" size={25} data-testid="icon4" />
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
        <div className={styles.card} data-testid="home-info-card">

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