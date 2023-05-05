import styles from './styles.module.scss';

interface ICustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    value: string;
    variation?: "1" | "2";
}

export function CustomButton({ value, variation = "1", ...rest }: ICustomButtonProps) {


    function getStyleClass(variation: string) {
        switch (variation) {
            case "1":
                return styles.button_variation_1;
            default:
                return styles.button_variation_1;
        }
    }

    return (
        <button
            className={getStyleClass(variation)}
            {...rest}
        >
            {value}
        </button>
    )
}