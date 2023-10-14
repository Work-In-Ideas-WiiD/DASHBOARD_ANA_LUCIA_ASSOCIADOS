import styles from './styles.module.scss';
import Logo from "../../assets/imgs/logo_ana.png";

import { ImHome } from 'react-icons/im';
import { FaBuilding, FaPenAlt } from 'react-icons/fa';
import { IoDocument } from 'react-icons/io5';
import { IoPersonSharp, IoFileTrayStackedSharp } from 'react-icons/io5';
import { BsPersonCircle, BsPersonVcardFill } from 'react-icons/bs';
import { SlLogout } from 'react-icons/sl';
import { SidebarItem } from './sidebarItem';
import { useLocation } from 'react-router-dom';
import { Fragment, ReactNode } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { TUserTypes } from '../../services/http/auth/auth.dto';


interface IItens {
    title: string,
    Icon: ReactNode,
    ActiveIcon: ReactNode,
    path: string,
    classname?: string,
    roles: TUserTypes[]
}

const itens: IItens[] = [
    {
        title: "Home",
        Icon: <ImHome fill="White" size={25} />,
        ActiveIcon: <ImHome fill="#1E3F49" size={25} />,
        path: "/home",
        roles: ['administrador', 'cliente', 'empresa']
    },
    {
        title: "Administradores",
        Icon: <BsPersonVcardFill fill="White" size={25} />,
        ActiveIcon: <BsPersonVcardFill fill="#1E3F49" size={25} />,
        path: "/admins",
        roles: ['administrador']
    },
    {
        title: "Empresas",
        Icon: <FaBuilding fill="White" size={25} />,
        ActiveIcon: <FaBuilding fill="#1E3F49" size={25} />,
        path: "/empresas",
        roles: ['administrador']
    },
    {
        title: "Contratos",
        Icon: <IoDocument fill="White" size={25} />,
        ActiveIcon: <IoDocument fill="#1E3F49" size={25} />,
        path: "/contratos",
        roles: ['administrador', 'cliente', 'empresa']
    },
    {
        title: "Arquivos",
        Icon: <IoFileTrayStackedSharp fill="White" size={25} />,
        ActiveIcon: <IoFileTrayStackedSharp fill="#1E3F49" size={25} />,
        path: "/arquivos",
        roles: ['administrador', 'cliente', 'empresa']
    },
    {
        title: "Assinaturas",
        Icon: <FaPenAlt fill="White" size={25} />,
        ActiveIcon: <FaPenAlt fill="#1E3F49" size={25} />,
        path: "/assinaturas",
        roles: ['administrador', 'cliente', 'empresa']
    },
    {
        title: "Clientes",
        Icon: <IoPersonSharp fill="White" size={25} />,
        ActiveIcon: <IoPersonSharp fill="#1E3F49" size={25} />,
        path: "/clientes",
        roles: ['administrador', 'cliente', 'empresa']
    },
    {
        title: "Perfil",
        Icon: <BsPersonCircle fill="white" size={25} />,
        ActiveIcon: <BsPersonCircle fill="#1E3F49" size={25} />,
        path: "/perfil",
        roles: ['administrador', 'empresa']
    },
    {
        title: "Sair",
        Icon: <SlLogout fill="White" size={25} />,
        ActiveIcon: <SlLogout fill="#1E3F49" size={25} />,
        path: "/logout",
        classname: "last_item",
        roles: ['administrador', 'cliente', 'empresa']
    },

]

export function Sidebar() {

    const { pathname } = useLocation();
    const { userRole } = useAuth();

    function _renderItem(_data: IItens[]) {
        return _data.map((item, i) => {

            if (!item.roles.includes(userRole)) {
                return (
                    <Fragment key={i}></Fragment>
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
        <aside className={styles.sidebar} role='complementary'>
            <img className={styles.logo} src={Logo} alt="logo" />
            <nav>
                {
                    _renderItem(itens)
                }
            </nav>
        </aside>
    )
}