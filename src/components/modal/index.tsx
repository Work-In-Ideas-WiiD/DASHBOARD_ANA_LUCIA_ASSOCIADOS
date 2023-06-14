import { MdOutlineClose } from 'react-icons/md';
import styles from './styles.module.scss';

export function Modal() {
    return (
        <div className={styles.modal_container}>
            <div className={styles.modal_box}>
                <header className={styles.header_modal}>
                    <button className={styles.btn_close_modal} onClick={() => { }}>
                        <MdOutlineClose color={"#263E48"} size={25} />
                    </button>
                    <h2 className={styles.title}>
                        titulo modal
                    </h2>
                </header>
            </div>
        </div>
    )
}