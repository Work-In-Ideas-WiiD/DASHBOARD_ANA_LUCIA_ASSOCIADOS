import styles from './styles.module.scss';
import { useAuth } from "../../../hooks/useAuth"
import { AdmProfile } from "./components/AdmProfile";
import { CompanyProfile } from "./components/CompanyProfile";
import { TUserTypes } from '../../../services/http/auth/auth.dto';

export function ProfilePage() {
    const { userRole } = useAuth();

    function _renderPage(userRole: TUserTypes) {
        if (userRole.includes("administrador")) {
            return (
                <AdmProfile />
            )
        }

        return (<CompanyProfile />)
    }

    return (
        <main className={`${styles.main} dashboard_padding`}>
            {_renderPage(userRole)}
        </main>
    )
}