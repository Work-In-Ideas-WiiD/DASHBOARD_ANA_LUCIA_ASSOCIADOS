import styles from './styles.module.scss';

export function SignedMessage() {

    return (
        <section className={styles.message_container}>
            <h2>
                Documento assinado!
            </h2>
            <p>Você já pode fechar seu navegador.</p>
        </section>
    )
}