import { MdOutlineClose } from 'react-icons/md';
import styles from './styles.module.scss';
import { ReactNode } from 'react';

interface IProps {
    children: ReactNode,
    title: string,
    handleModal: (option: boolean) => void
}

export function Modal({ children, title, handleModal }: IProps) {
    return (
        <div className={styles.modal_container}>
            <div className={styles.color_container}>
                <div className={styles.modal_box}>
                    <header className={styles.header_modal}>
                        <button className={styles.btn_close_modal} onClick={() => { handleModal(false) }}>
                            <MdOutlineClose color={"#263E48"} size={25} />
                        </button>
                        <h2 className={styles.title}>
                            {title}
                        </h2>
                    </header>
                    <div className={styles.body_modal}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}