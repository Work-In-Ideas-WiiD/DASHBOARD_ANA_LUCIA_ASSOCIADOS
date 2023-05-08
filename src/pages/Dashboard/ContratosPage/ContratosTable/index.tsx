import styles from './styles.module.scss';
import { CustomButton, EIconCustomButton } from "../../../../components/customButton";
import { SearchBar } from '../../../../components/inputs/searchBar';
import { useState } from 'react';
import { SelectInput } from '../../../../components/inputs/selectInput';
import { StatusBadge } from '../../../../components/statusBadge/statusBadge';
import { TableCustomButton } from '../../../../components/tableCustomButton';
import { useNavigate } from 'react-router-dom';

export function ContratosTable() {

    const [search, setSearch] = useState("");
    const [fetching, setFetching] = useState(false);
    const navigate = useNavigate();

    function searchData() {
        setFetching(true);
    }

    function goToNewContract() {
        navigate('novo');
    }

    return (

        <section className={styles.table}>
            <h2 className={`${styles.title} dashboard_title`}>CONTRATOS</h2>
            <div className={styles.table_header}>
                <SearchBar
                    handleSearch={searchData}
                    placeholder='Pesquisar por ID, nome, e-mail e número de documento…'
                    fetching={fetching}
                />
                <SelectInput />
                <CustomButton onClick={goToNewContract} title='NOVO CADASTRO' icon={EIconCustomButton.MdCreateNewFolder} type='button' />
            </div>
            <table className='table_style'>
                <thead >
                    <tr>
                        <th>
                            Contrato
                        </th>
                        <th>
                            Empresa
                        </th>
                        <th>
                            Status
                        </th>
                        <th>

                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Marisa Teixeira dos Santos Lima </td>
                        <td>055298841-30</td>
                        <td><StatusBadge status='Assinado' /></td>
                        <td><TableCustomButton title='Enviar para empresa' /></td>
                    </tr>
                    <tr>
                        <td>Marisa Teixeira dos Santos Lima </td>
                        <td>055298841-30</td>
                        <td><StatusBadge status='Pendente' /></td>
                        <td><TableCustomButton title='Enviar para empresa' /></td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}