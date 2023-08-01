import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from '../components/layouts/include/Loading';
import { toast } from 'react-toastify';

const RedirectLoading = ({ role }) => {
    const [count, setCount] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
            count === 0 && toast.error(`Only ${role} allow to access this resource...`, { theme: "colored" });
            count === 0 && navigate("/auth");

        }, 1000);
        return () => clearInterval(interval);
    }, [navigate, count, role])
    return (
        <Loading />
    )
}
export default RedirectLoading
