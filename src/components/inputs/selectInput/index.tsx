import styles from './styles.module.scss';
import Select from 'react-select';

const options = [
    { value: 'empresa 1', label: 'empresa 1' },
    { value: 'empresa 2', label: 'empresa 2' },
    { value: 'empresa 3', label: 'empresa 3' }
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