import styles from './styles.module.scss';
import { CustomButton, EIconCustomButton } from "../../../../components/customButton";
import { SearchBar } from '../../../../components/inputs/searchBar';
import { useState } from 'react';
import { SelectInput } from '../../../../components/inputs/selectInput';
import { useNavigate } from 'react-router-dom';
import * as zod from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = zod.object({
    search: zod.string(),
    type: zod.object({
        value: zod.string(),
        label: zod.string()
    })
});

type TFormSchema = zod.infer<typeof formSchema>;

const selectOptions = [
    { value: 'clientes', label: 'Clientes' },
    { value: 'empresas', label: 'Empresas' },
]
export function ClienteTable() {

    const [fetching, setFetching] = useState(false);
    const navigate = useNavigate();
    const { handleSubmit, control } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: '',
        }
    })

    function searchData(data: TFormSchema) {
        //setFetching(true);
        console.log(data);

    }

    function goTo() {
        navigate("novo");
    }

    return (
        <section className={styles.table}>
            <h2 className={`${styles.title} dashboard_title`}>CLIENTES</h2>
            <form className={styles.table_header} onSubmit={handleSubmit(searchData)}>
                <SearchBar
                    control={control}
                    fieldName='search'
                    placeholder='Pesquisar por ID, nome, e-mail e número de documento…'
                    fetching={fetching}
                />
                <SelectInput
                    options={selectOptions}
                    fieldName='type'
                    control={control}
                />
                <CustomButton onClick={goTo} title='NOVO CADASTRO' icon={EIconCustomButton.MdCreateNewFolder} type='button' />
            </form>
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