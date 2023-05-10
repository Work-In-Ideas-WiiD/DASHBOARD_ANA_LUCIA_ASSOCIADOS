import { CustomButton } from '../../../../components/customButton';
import { CustomCheckbox } from '../../../../components/inputs/customCheckbox';
import { InputText } from '../../../../components/inputs/inputText';
import styles from './styles.module.scss';
import { FaFileUpload } from 'react-icons/fa';
import * as zod from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = zod.object({
    numero_contrato: zod.string(),
    empresa: zod.string(),
    chk_enviar_contrato: zod.boolean()
})

// validacao de arquivo
// const MAX_FILE_SIZE = 500000;
// const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

// const RegistrationSchema = z.object({
//     profileImage: z
//         .any()
//         .refine((files) => files?.length == 1, "Image is required.")
//         .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
//         .refine(
//             (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
//             ".jpg, .jpeg, .png and .webp files are accepted."
//         ),
// });

type TFormSchema = zod.infer<typeof formSchema>;


export function NovoContrato() {

    const { handleSubmit, control } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            numero_contrato: '',
            empresa: '',
            chk_enviar_contrato: false
        }
    })

    function handleCreate(data: TFormSchema) {
        console.log(data);
    }

    return (
        <section className={styles.new_contract}>
            <h2 className={`${styles.title} dashboard_title`}>NOVO CADASTRO</h2>
            <div className={styles.form_wrapper}>
                <form onSubmit={handleSubmit(handleCreate)}>
                    <InputText
                        control={control}
                        fieldName='numero_contrato'
                        title='Número do contrato'
                        type='tel'
                        placeholder='111111111'
                        containerClass='mb-14'
                    />
                    <InputText
                        control={control}
                        fieldName='empresa'
                        title='Empresa'
                        type='tel'
                        placeholder='Empresa'
                        containerClass='mb-25'
                    />
                    <div className={styles.chk_wrapper}>
                        <CustomCheckbox
                            fieldName='chk_enviar_contrato'
                            control={control}
                            id='1'
                        />
                        <label className={styles.chk_label}>Enviar este contrato agora para a empresa</label>
                    </div>
                    <div className={styles.input_file_wrapper}>
                        <label htmlFor="upload-file">
                            <FaFileUpload color="#CE6E40" size="27" />
                            <span>Upload do arquivo</span>
                        </label>
                        <input type="file" id='upload-file' />
                    </div>
                    <CustomButton
                        title='Adicionar contrato'
                        variation='2'
                    />
                </form>
            </div>
        </section>
    )
}