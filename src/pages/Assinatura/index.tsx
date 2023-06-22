import styles from './styles.module.scss';
import Logo from '../../assets/imgs/logo_ana.png';
import { useEffect, useState } from 'react';
import { Clicksign } from "../../utils/clicksign";
import { useParams } from 'react-router-dom';
import { getClickSignKey } from '../../services/http/clientes';
import { toast } from 'react-toastify';
import { SignedMessage } from './components/signedMessage';

export function Assinatura() {
    const params = useParams();
    const [documentSigned, setDocumentSigned] = useState(false);
    let widgetController: any = null;

    useEffect(() => {
        startClickSign();
    }, []);

    function clearContainer() {
        const container = document.querySelector("#container");
        container!.innerHTML = "";
    }

    async function startClickSign() {
        clearContainer();
        try {

            const id = params.id as string;
            const { data } = await getClickSignKey(id);
            let widget = Clicksign(data.key);
            if (widgetController) return;
            widgetController = widget;
            // Define o endpoint https://sandbox.clicksign.com ou https://app.clicksign.com
            widget.endpoint = import.meta.env.VITE_CLICKSIGN_ENDPOINT;
            // Define a origem https://sistema.alabadvogados.com.br/ ou http://localhost:5173
            widget.origin = import.meta.env.VITE_CLICKSIGN_ORIGIN;
            widget.mount('container');
            widget.on('loaded', () => {
                console.log('loaded!');
            });
            widget.on('signed', () => {
                setDocumentSigned(true);
                closeWidget();
            });
        } catch (error) {
            closeWidget();
            toast.error("Erro ao efetuar assinatura, contate o administrador.");
        }

    }

    function closeWidget() {
        if (widgetController) {
            widgetController.unmount();
        }
    }

    function _renderMessage(value: boolean) {
        if (value) {
            return (
                <SignedMessage />
            )
        }

        return (<></>)
    }

    return (
        <main className={styles.main} >
            <header>
                <img src={Logo} alt="Ana Lúcia e Associados" />
            </header>
            {_renderMessage(documentSigned)}
            <div className={styles.container} id='container'> </div>

        </main>
    )
}