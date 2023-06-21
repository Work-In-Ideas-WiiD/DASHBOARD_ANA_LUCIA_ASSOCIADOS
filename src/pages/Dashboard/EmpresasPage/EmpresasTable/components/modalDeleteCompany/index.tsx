import { MdOutlineClose } from 'react-icons/md';
import styles from './styles.module.scss';
import { CustomButton } from '../../../../../../components/customButton';
import { IGetEmpresasDataRes } from '../../../../../../services/http/empresas/empresas.dto';

interface IProps {
    show: boolean
    handleModal: (option: boolean) => void,
    handleDelete: (id: string) => void,
    company: IGetEmpresasDataRes
}

export function ModaDeleteCompany({ handleModal, handleDelete, company, show }: IProps) {


    if (!show) {
        return (
            <></>
        )
    }

    return (
        <div className={styles.modal_container}>
            <div className={styles.color_container}>
                <div className={styles.modal_box}>
                    <header className={styles.header_modal}>
                        <button className={styles.btn_close_modal} onClick={() => { handleModal(false) }}>
                            <MdOutlineClose color={"#263E48"} size={25} />
                        </button>
                        <h2 className={styles.title}>
                            Excluir empresa
                        </h2>
                    </header>
                    <div className={styles.body_modal}>
                        <p>Deseja excluír a empresa {company.nome}? está ação é irreversivel!</p>
                        <br />
                        <div className={styles.btn_container}>
                            <CustomButton
                                onClick={() => { handleDelete(company.id) }}
                                title='Excluir'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}