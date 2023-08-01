import { useSelector } from 'react-redux';
import RedirectLoading from './RedirectLoading';

const Admin = ({ children }) => {
    const { user } = useSelector((state) => state.auth);
    return user && user.role === "Admin" ? children : <RedirectLoading role={"Admin"} />
}

export default Admin
