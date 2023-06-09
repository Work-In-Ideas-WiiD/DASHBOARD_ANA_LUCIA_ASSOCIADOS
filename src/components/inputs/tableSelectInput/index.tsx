import './styles.scss';
import Select from 'react-select';
import { Control, Controller } from 'react-hook-form';

export interface IOptions {
    value: string,
    label: string
}

interface ISelectInputProps {
    options: IOptions[];
    fieldName: string;
    control: Control<any>
}


export function TableSelectInput({
    options,
    fieldName,
    control
}: ISelectInputProps) {
    return (
        <Controller
            name={fieldName}
            control={control}
            render={({ field }) => {
                return (
                    <Select
                        onChange={field.onChange}
                        options={options}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        placeholder="Tipo"
                    />
                )
            }}

        />

    )
}