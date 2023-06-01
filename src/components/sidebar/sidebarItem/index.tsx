import { ReactNode } from 'react';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

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
    const { signOut } = useAuth();
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
        if (route === "/logout") {
            return signOut();
        }
        navigate('/dashboard' + route);
    }

    return (
        <div className={`${classname} ${verifyItemActive()}`} onClick={() => { handleRoute(path) }} >
            {returnCurrentIcon(active)}
            <span>{title}</span>
        </div>
    )
}