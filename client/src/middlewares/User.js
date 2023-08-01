import { useSelector } from 'react-redux';
import RedirectLoading from './RedirectLoading';

const User = ({ children }) => {
    const { user } = useSelector((state) => state.auth);
    return user && user.role === "User" ? children : <RedirectLoading role={"User"} />
}

export default User
