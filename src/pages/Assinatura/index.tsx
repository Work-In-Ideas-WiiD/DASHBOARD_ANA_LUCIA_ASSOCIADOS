import styles from './styles.module.scss';
import Logo from '../../assets/imgs/logo_ana.png';
import { useEffect, useRef } from 'react';


declare global {
    class Clicksign {

        constructor(id: string)
        endpoint: any;
        origin: any;
        mount: any;
    }
}

export function Assinatura() {

    const ref = useRef();

    useEffect(() => {
        startClickSign();
    }, []);

    function startClickSign() {

        const script = document.createElement('script');
        const body = document.getElementsByTagName('body')[0];
        script.type = 'text/javascript';
        script.async = true;
        script.src = "https://raw.githubusercontent.com/clicksign/embedded/main/build/embedded.js";
        body.appendChild(script)
        script.addEventListener('load', (e) => {
            setTimeout(() => {
                console.log(e);

                // Carrega o widget embedded com a request_signature_key
                var widget = new Clicksign('');

                // // Define o endpoint https://sandbox.clicksign.com ou https://app.clicksign.com
                // widget.endpoint = 'https://sandbox.clicksign.com';

                // // Define a URL de origem (parametro necessário para utilizar através de WebView)
                // widget.origin = 'https://localhost:5173';

                // // Monta o widget no div
                // widget.mount('container');
            }, 3000)
        });

        // // Callback que será disparado quando o documento for carregado
        // widget.on('loaded', function (ev: any) {
        //     console.log('loaded!');
        // });

        // // Callback que será disparado quando o documento for assinado
        // widget.on('signed', function (ev: any) {
        //     console.log('signed!');
        //     return location.assign("http://www.example.com");
        // });

        // /* Callback que será disparado nas etapas de informar dados do signatário
        // e token, retornando a altura (height) dessas páginas para ajuste do container
        // onde o iframe se encontra. */
        // widget.on('resized', function (height: any) {
        //     console.log('resized!');
        //     document.getElementById('container')!.style.height = height + 'px';
        // });

    }

    return (
        <main className={styles.main} >
            <header>
                <img src={Logo} alt="Ana Lúcia e Associados" />
            </header>
            <div id='container'>

            </div>
        </main>
    )
}