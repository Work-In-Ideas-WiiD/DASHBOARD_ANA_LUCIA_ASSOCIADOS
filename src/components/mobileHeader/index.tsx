import { ReactNode, useState } from 'react';
import Logo from '../../assets/imgs/logo_ana.png';
import styles from './styles.module.scss';
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineClose } from "react-icons/md";
import { ImHome } from 'react-icons/im';
import { FaBuilding, FaPenAlt } from 'react-icons/fa';
import { IoDocument, IoFileTrayStackedSharp } from 'react-icons/io5';
import { IoPersonSharp } from 'react-icons/io5';
import { BsPersonCircle, BsPersonVcardFill } from 'react-icons/bs';
import { AsideItem } from './asideItem';
import { useLocation, useNavigate } from 'react-router-dom';
import { RiLogoutBoxRLine } from 'react-icons/ri';
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
        Icon: <ImHome fill="White" size={20} />,
        ActiveIcon: <ImHome fill="#1E3F49" size={20} />,
        path: "/home",
        adm: false
    },
    {
        title: "Administradores",
        Icon: <BsPersonVcardFill fill="White" size={20} />,
        ActiveIcon: <BsPersonVcardFill fill="#1E3F49" size={20} />,
        path: "/admins",
        adm: true
    },
    {
        title: "Empresas",
        Icon: <FaBuilding fill="White" size={20} />,
        ActiveIcon: <FaBuilding fill="#1E3F49" size={20} />,
        path: "/empresas",
        adm: true
    },
    {
        title: "Contratos",
        Icon: <IoDocument fill="White" size={20} />,
        ActiveIcon: <IoDocument fill="#1E3F49" size={20} />,
        path: "/contratos",
        adm: false
    },
    {
        title: "Arquivos",
        Icon: <IoFileTrayStackedSharp fill="White" size={20} />,
        ActiveIcon: <IoFileTrayStackedSharp fill="#1E3F49" size={20} />,
        path: "/arquivos",
        adm: false
    },
    {
        title: "Assinaturas",
        Icon: <FaPenAlt fill="White" size={20} />,
        ActiveIcon: <FaPenAlt fill="#1E3F49" size={20} />,
        path: "/assinaturas",
        adm: false
    },
    {
        title: "Clientes",
        Icon: <IoPersonSharp fill="White" size={20} />,
        ActiveIcon: <IoPersonSharp fill="#1E3F49" size={20} />,
        path: "/clientes",
        adm: false
    },
    {
        title: "Perfil",
        Icon: <BsPersonCircle fill="white" size={25} />,
        ActiveIcon: <BsPersonCircle fill="#1E3F49" size={25} />,
        path: "/perfil",
        adm: false
    },
    {
        title: "Sair",
        Icon: <RiLogoutBoxRLine fill="White" size={20} />,
        ActiveIcon: <RiLogoutBoxRLine fill="#1E3F49" size={20} />,
        path: "/logout",
        classname: "last_item",
        adm: false
    },

]
type TMenuIsOpen = "menu_mobile_close" | "menu_mobile_open";

export function MobileHeader() {
    const { pathname } = useLocation();
    const [menuIsOpen, setMenuIsOpen] = useState<TMenuIsOpen>("menu_mobile_close");
    const navigate = useNavigate();
    const { isAdmin } = useAuth();

    function handleClick(option: TMenuIsOpen) {
        setMenuIsOpen(option);
    }
    function handleRoute(route: string) {
        handleClick('menu_mobile_close');
        if (route === "/logout") {
            return navigate('/');
        }
        navigate('/dashboard' + route);
    }

    function _renderMenuBg() {
        if (menuIsOpen == "menu_mobile_open") {
            return (
                <div className={styles.menu_bg} onClick={() => { handleClick('menu_mobile_close'); }}></div>
            )
        }
        return (
            <></>
        )
    }


    function _renderItem(_data: IItens[]) {
        return _data.map((item) => {

            if (item.adm && !isAdmin) {
                return (
                    <></>
                )
            }

            return (
                <AsideItem
                    key={item.title}
                    ActiveIcon={item.ActiveIcon}
                    Icon={item.Icon}
                    path={item.path}
                    title={item.title}
                    active={pathname.includes(item.path)}
                    classname={item.classname}
                    handleRoute={handleRoute}
                />
            )
        })
    }

    return (
        <>
            <header className={styles.header}>
                <img src={Logo} alt="Ana Lúcia e Associados" />
                <button className={styles.menu_btn} onClick={() => { handleClick('menu_mobile_open') }}>
                    <RxHamburgerMenu color={"#fff"} size={25} />
                </button>
            </header>
            {_renderMenuBg()}
            <aside className={`${styles.menu_mobile} ${styles[menuIsOpen]}`}>
                <div className={styles.header_menu}>
                    <img src={Logo} alt="Ana Lúcia e Associados" />
                    <button className={styles.menu_btn} onClick={() => { handleClick('menu_mobile_close') }}>
                        <MdOutlineClose color={"#263E48"} size={25} />
                    </button>
                </div>
                <nav className={styles.item_list}>
                    {
                        _renderItem(itens)
                    }
                </nav>
            </aside>
        </>
    )
}