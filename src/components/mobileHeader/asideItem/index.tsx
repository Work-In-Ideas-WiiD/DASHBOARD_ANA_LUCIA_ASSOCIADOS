import { ReactNode } from "react";
import styles from './styles.module.scss';

interface IAsideItemProps {
    title: string,
    Icon: ReactNode,
    ActiveIcon: ReactNode,
    path: string,
    active: boolean,
    classname?: string,
    handleRoute: (route: string) => void
}

export function AsideItem({
    title,
    Icon,
    ActiveIcon,
    path,
    active,
    classname = '',
    handleRoute
}: IAsideItemProps) {

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

    return (
        <div data-testid={title} className={`${classname} ${verifyItemActive()}`} onClick={() => { handleRoute(path) }} >
            {returnCurrentIcon(active)}
            <span>{title}</span>
        </div>
    )

}