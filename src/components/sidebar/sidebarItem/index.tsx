import { ReactNode } from 'react';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';

interface ISidebarItemProps {
    title: string,
    Icon: ReactNode,
    ActiveIcon: ReactNode,
    path: string,
    active: boolean,
    classname?: string
}

export function SidebarItem({
    title,
    Icon,
    ActiveIcon,
    path,
    active,
    classname = ''
}: ISidebarItemProps) {
    const navigate = useNavigate();
    function returnCurrentIcon(active: boolean) {
        if (active) {
            return ActiveIcon;
        }
        return Icon;
    }

    function verifyItemActive() {
        if (active) {
            return styles.item_active;
        }

        return styles.item;
    }

    function handleRoute(route: string) {
        navigate(route);
    }

    return (
        <div className={`${classname} ${verifyItemActive()}`} onClick={() => { handleRoute(path) }} >
            {returnCurrentIcon(active)}
            <span>{title}</span>
        </div>
    )
}