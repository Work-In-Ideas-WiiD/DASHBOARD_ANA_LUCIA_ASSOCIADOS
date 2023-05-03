import { Sidebar } from '../../components/sidebar';
import styles from './styles.module.scss';

export function DashboardPage() {


    return (
        <main className={styles.main}>
            <Sidebar />
            <div>
                <h2>outlat</h2>
            </div>
        </main>
    )
}