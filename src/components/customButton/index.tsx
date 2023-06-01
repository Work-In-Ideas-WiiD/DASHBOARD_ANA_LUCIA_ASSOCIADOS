import { RotatingLines } from 'react-loader-spinner';
import styles from './styles.module.scss';
import { MdCreateNewFolder } from 'react-icons/md';
import { useAuth } from '../../hooks/useAuth';

export enum EIconCustomButton {
    MdCreateNewFolder = 0
}

interface ICustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    variation?: "1" | "2" | "3";
    icon?: EIconCustomButton;
}

const Icons = {
    0: <MdCreateNewFolder size={24} color="#fff" />
}

export function CustomButton({ title, icon, variation = "1", ...rest }: ICustomButtonProps) {
    const { fetching } = useAuth();

    function getStyleClass(variation: string) {
        switch (variation) {
            case "1":
                return styles.button_variation_1;
            case "2":
                return styles.button_variation_2;
            case "3":
                return styles.button_variation_3;
            default:
                return styles.button_variation_1;
        }
    }

    function returnIcon(icon: EIconCustomButton | undefined) {

        if (icon !== undefined) {
            return (Icons[icon]);
        }
        return (<></>)
    }

    function _renderContent(title: string, loading: boolean) {
        if (loading) {
            return (
                <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="1.00"
                    width="24"
                    visible={true}
                />
            )
        }

        return title;
    }

    return (
        <button
            className={getStyleClass(variation)}
            {...rest}
        >
            {returnIcon(icon)}
            {_renderContent(title, fetching)}
        </button>
    )
}