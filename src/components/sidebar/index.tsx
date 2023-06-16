import styles from './styles.module.scss';
import Logo from "../../assets/imgs/logo_ana.png";

import { ImHome } from 'react-icons/im';
import { FaBuilding, FaPenAlt } from 'react-icons/fa';
import { IoDocument } from 'react-icons/io5';
import { IoPersonSharp } from 'react-icons/io5';
import { BsPersonVcardFill } from 'react-icons/bs';
import { SlLogout } from 'react-icons/sl';

import { SidebarItem } from './sidebarItem';
import { useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface IItens {
    title: string,
    Icon: ReactNode,
    ActiveIcon: ReactNode,
    path: string,
    classname?: string,
    adm: boolean
}

const itens: IItens[] = [
    {
        title: "Home",
        Icon: <ImHome fill="White" size={25} />,
        ActiveIcon: <ImHome fill="#1E3F49" size={25} />,
        path: "/home",
        adm: false
    },
    {
        title: "Administradores",
        Icon: <BsPersonVcardFill fill="White" size={25} />,
        ActiveIcon: <BsPersonVcardFill fill="#1E3F49" size={25} />,
        path: "/admins",
        adm: true
    },
    {
        title: "Empresas",
        Icon: <FaBuilding fill="White" size={25} />,
        ActiveIcon: <FaBuilding fill="#1E3F49" size={25} />,
        path: "/empresas",
        adm: true
    },
    {
        title: "Contratos",
        Icon: <IoDocument fill="White" size={25} />,
        ActiveIcon: <IoDocument fill="#1E3F49" size={25} />,
        path: "/contratos",
        adm: false
    },
    {
        title: "Assinaturas",
        Icon: <FaPenAlt fill="White" size={25} />,
        ActiveIcon: <FaPenAlt fill="#1E3F49" size={25} />,
        path: "/assinaturas",
        adm: false
    },
    {
        title: "Clientes",
        Icon: <IoPersonSharp fill="White" size={25} />,
        ActiveIcon: <IoPersonSharp fill="#1E3F49" size={25} />,
        path: "/clientes",
        adm: false
    },
    {
        title: "Sair",
        Icon: <SlLogout fill="White" size={25} />,
        ActiveIcon: <SlLogout fill="#1E3F49" size={25} />,
        path: "/logout",
        classname: "last_item",
        adm: false
    },

]

export function Sidebar() {

    const { pathname } = useLocation();
    const { isAdmin } = useAuth();

    function _renderItem(_data: IItens[]) {
        return _data.map((item) => {

            if (item.adm && !isAdmin) {
                return (
                    <></>
                )
            }

            return (
                <SidebarItem
                    key={item.title}
                    ActiveIcon={item.ActiveIcon}
                    Icon={item.Icon}
                    path={item.path}
                    title={item.title}
                    active={pathname.includes(item.path)}
                    classname={item.classname}
                />
            )
        })
    }

    return (
        <aside className={styles.sidebar}>
            <img className={styles.logo} src={Logo} alt="logo" />
            <nav>
                {
                    _renderItem(itens)
                }
            </nav>
        </aside>
    )
}