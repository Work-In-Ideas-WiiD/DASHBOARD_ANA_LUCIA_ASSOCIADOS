import styles from './styles.module.scss';
import { CustomButton, EIconCustomButton } from "../../../../components/customButton";
import { SearchBar } from '../../../../components/inputs/searchBar';
import { useState } from 'react';
import { SelectInput } from '../../../../components/inputs/selectInput';
import { useNavigate } from 'react-router-dom';

export function ClienteTable() {

    const [search, setSearch] = useState("");
    const [fetching, setFetching] = useState(false);
    const navigate = useNavigate();

    function searchData() {
        setFetching(true);
    }

    function goTo() {
        navigate("novo");
    }

    return (
        <section className={styles.table}>
            <h2 className={`${styles.title} dashboard_title`}>CLIENTES</h2>
            <div className={styles.table_header}>
                <SearchBar
                    handleSearch={searchData}
                    placeholder='Pesquisar por ID, nome, e-mail e número de documento…'
                    fetching={fetching}
                />
                <SelectInput />
                <CustomButton onClick={goTo} title='NOVO CADASTRO' icon={EIconCustomButton.MdCreateNewFolder} type='button' />
            </div>
            <table className='table_style'>
                <thead >
                    <tr>
                        <th>
                            Nome
                        </th>
                        <th>
                            Nome da empresa
                        </th>
                        <th>
                            CPF/CNPJ
                        </th>
                        <th>
                            E-mail
                        </th>
                        <th>
                            Celular
                        </th>
                        <th>
                            Endereço
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Marisa Teixeira dos Santos Lima </td>
                        <td>Clínica Médica Nobel S.A </td>
                        <td>055298841-30</td>
                        <td>marisa124123@gmail.com</td>
                        <td>062 9852-5468</td>
                        <td>Rua 4, Setor Marista, 75200-00</td>
                    </tr>
                    <tr>
                        <td>Marisa Teixeira dos Santos Lima </td>
                        <td>Clínica Médica Nobel S.A </td>
                        <td>055298841-30</td>
                        <td>marisa124123@gmail.com</td>
                        <td>062 9852-5468</td>
                        <td>Rua 4, Setor Marista, 75200-00</td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}