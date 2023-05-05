import styles from './styles.module.scss';
import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

export function SelectInput() {
    return (
        <Select
            options={options}
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="Tipo"

        />
    )
}