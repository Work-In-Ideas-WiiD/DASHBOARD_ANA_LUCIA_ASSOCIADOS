import { BackButton } from "../backButton";

interface IProps {
    title: string;
    backFunction: () => void;
    showBackButton?: boolean;
}

export function PageTitle({
    backFunction,
    title,
    showBackButton = false,
}: IProps) {

    function _renderButton(show: boolean) {
        if (show) {
            return (
                <BackButton click={backFunction} />
            )
        }
        return (<></>)
    }
    return (
        <div className='flex-row gap-10'>
            {_renderButton(showBackButton)}
            <h2 className={`dashboard_title`}>{title}</h2>
        </div>
    )
}