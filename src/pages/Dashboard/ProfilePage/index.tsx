import styles from './styles.module.scss';
import { useAuth } from "../../../hooks/useAuth"
import { AdmProfile } from "./components/AdmProfile";
import { CompanyProfile } from "./components/CompanyProfile";

export function ProfilePage() {
    const { isAdmin } = useAuth();

    function _renderPage(adm: boolean) {
        if (adm) {
            return (
                <AdmProfile />
            )
        }

        return (<CompanyProfile />)
    }

    return (
        <main className={`${styles.main} dashboard_padding`}>
            {_renderPage(isAdmin)}
        </main>
    )
}