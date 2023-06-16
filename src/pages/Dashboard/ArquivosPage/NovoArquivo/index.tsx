import { CustomButton } from '../../../../components/customButton';
import { CustomCheckbox } from '../../../../components/inputs/customCheckbox';
import { InputText } from '../../../../components/inputs/inputText';
import styles from './styles.module.scss';
import { FaFileUpload } from 'react-icons/fa';
import * as zod from "zod";
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { PageTitle } from '../../../../components/pageTitle';
import { useEffect, useState } from 'react';
import { useDebounce } from "use-debounce";
import { getEmpresas } from '../../../../services/http/empresas';
import { IGetEmpresasDataRes } from '../../../../services/http/empresas/empresas.dto';
import { ErrorMessage } from '@hookform/error-message';
import { toast } from 'react-toastify';
import { useAuth } from '../../../../hooks/useAuth';
import { postContrato } from '../../../../services/http/contratos';
import { postAddEmpresaToContratoOrArquivo } from '../../../../services/http/administradores';
// validacao de arquivo

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["application/pdf"];

const formSchema = zod.object({
    descricao: zod.string({
        required_error: "Campo obrigatório",
    }),
    empresa: zod.string({
        required_error: "Campo obrigatório",
    }),
    file: zod.any()
        .refine((files) => files?.length == 1, "Arquivo obrigatório.")
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Tamanho maximo do arquivo é 50mb.`)
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            "Apenas arquivos no formato pdf são válidos."
        ),
})

type TFormSchema = zod.infer<typeof formSchema>;

export function NovoArquivo() {
    const navigate = useNavigate();
    const { handleFetching, fetching } = useAuth();
    const [debounceValue, setDebounceValue] = useState("");
    const [companies, setCompanies] = useState<IGetEmpresasDataRes[]>([]);
    const [debouncedText] = useDebounce(debounceValue, 500);
    const [companyId, setCompanyId] = useState<string | null>(null);
    const { handleSubmit, formState: { errors }, control, setValue } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            descricao: undefined,
            empresa: undefined,
        }
    })

    useEffect(() => {
        searchCompany()
    }, [debouncedText])

    async function handleCreate(data: TFormSchema) {
        if (fetching) {
            return
        }
        if (!companyId) {
            return toast.error("Selecione uma empresa");
        }
        try {
            handleFetching(true);
            const formData = new FormData();
            formData.append("descricao", data.descricao);
            formData.append("file", data.file[0]);
            const { data: contractRes } = await postContrato(formData);//registra o contrato
            await postAddEmpresaToContratoOrArquivo(companyId, contractRes.id);//marca empresa no contrato
            toast.success("Contrato cadastrado!")
            handleFetching(false);
            setTimeout(() => {
                goBack();
            }, 3000);

        } catch (err) {
            handleFetching(false);
            toast.error("Erro ao cadastrar contrato");
            console.log(err);
        }
    }

    function goBack() {
        navigate("/dashboard/contratos");
    }


    async function searchCompany() {

        if (debouncedText) {
            const { data } = await getEmpresas(1, debouncedText);
            setCompanies(data.data);
        } else {
            clearCompanies();
        }
    }

    function setDebounce(event: React.ChangeEvent<HTMLInputElement>) {
        setDebounceValue(event.target.value);
        setValue("empresa", event.target.value);
    }


    function selectCompany(value: IGetEmpresasDataRes) {
        setValue("empresa", value.nome_empresa!);
        setCompanyId(value.id);
    }

    function renderCompanyList(list: IGetEmpresasDataRes[]) {
        if (list.length == 0) {
            return (<></>)
        }
        return list.map((item) => {
            return (
                <div className={styles.item} key={item.id} onClick={(e) => {
                    e.stopPropagation();
                    selectCompany(item);
                }}>
                    <span>{item.nome_empresa}</span>
                </div>
            )
        })
    }

    function clearCompanies() {
        setTimeout(() => {
            setCompanies([]);
        }, 200);
    }

    return (
        <section className={styles.new_contract}>
            <PageTitle
                backFunction={goBack}
                title='NOVO ARQUIVO'
                showBackButton={true}
            />
            <div className={styles.form_wrapper}>
                <form onSubmit={handleSubmit(handleCreate)}>
                    <InputText
                        control={control}
                        fieldName='descricao'
                        title='Nome'
                        type='text'
                        placeholder='Nome do contrato'
                        containerClass='mb-25'
                        errors={errors}
                    />
                    <div className={styles.input_search}>
                        <InputText
                            onBlur={clearCompanies}
                            control={control}
                            fieldName='empresa'
                            title='Empresa'
                            type='tel'
                            placeholder='Empresa'
                            errors={errors}
                            onChange={setDebounce}
                        />
                        <div className={styles.company_list}>
                            {renderCompanyList(companies)}
                        </div>
                    </div>
                    <div className={styles.input_file_wrapper}>
                        <label htmlFor="upload-file">
                            <FaFileUpload color="#CE6E40" size="27" />
                            <span>Upload do arquivo</span>
                        </label>
                        <ErrorMessage
                            errors={errors}
                            name={"file"}
                            render={({ message }) => {
                                return (
                                    <span className={styles.error_msg}>{message}</span>
                                )
                            }}

                        />
                        <Controller
                            name='file'
                            control={control}
                            render={({ field }) => {
                                return (
                                    <input type="file" id='upload-file' accept='application/pdf' onChange={(event) => {
                                        field.onChange(event.target.files)
                                    }} />
                                )
                            }}

                        />
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