import styles from './styles.module.scss';
import { MdCreateNewFolder } from 'react-icons/md';

export enum EIconCustomButton {
    MdCreateNewFolder = 0
}

interface ICustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    value: string;
    variation?: "1" | "2";
    icon?: EIconCustomButton;
}

const Icons = {
    0: <MdCreateNewFolder size={24} color="#fff" />
}

export function CustomButton({ value, icon, variation = "1", ...rest }: ICustomButtonProps) {


    function getStyleClass(variation: string) {
        switch (variation) {
            case "1":
                return styles.button_variation_1;
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

    return (
        <button
            className={getStyleClass(variation)}
            {...rest}
        >
            {returnIcon(icon)}
            {value}
        </button>
    )
}