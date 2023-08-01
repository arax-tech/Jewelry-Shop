import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { AuthUser, ProfileUpdateFunction } from '../../redux/actions/AuthAction'
import { UPDATE_PROFILE_RESET } from '../../redux/constants/AuthConstant'
import Loading from '../layouts/include/Loading'
import MetaData from '../layouts/include/MetaData'
import Layout from './layouts/Layout'
const AdminProfile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { loading, isUpdated, message } = useSelector((state) => state.profile);
    const [image, setImage] = useState();
    const [data, setData] = useState({
        name: user && user.name,
        email: user && user.email,
    });

    const inpChnage = (event) => {
        if (event.target.name === "image") {
            setImage(event.target.files[0]);
        } else {
            setData({ ...data, [event.target.name]: event.target.value })
        }
    }

    const updateProfileFormSubmit = (event) => {
        event.preventDefault();
        const form = new FormData();
        form.append("name", data.name);
        form.append("email", data.email);
        form.append("image", image);
        console.log(form);
        dispatch(ProfileUpdateFunction(form))

    }

    useEffect(() => {
        if (isUpdated && isUpdated === true) {
            toast.success(message, { theme: "colored" });
            dispatch({ type: UPDATE_PROFILE_RESET })
            dispatch(AuthUser());
        }
    }, [dispatch, isUpdated, message])

    return (
        loading ? <Loading /> :
            <Layout>
                <MetaData title="Admin - Profile" />
                <div className="col-lg-9 col-md-8">
                    <div className="myaccount-content">
                        <h5>Admin Profile</h5>

                        <div className="account-details-form">
                            <form method='post' encType='multipart/form-data' onSubmit={updateProfileFormSubmit}>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="single-input-item">
                                            <label className="required">Name</label>
                                            <input type="text" onChange={inpChnage} name='name' value={data.name} required />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="single-input-item">
                                            <label className="required">Email</label>
                                            <input type="email" onChange={inpChnage} name='email' value={data.email} required />
                                        </div>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="single-input-item">
                                            <label className="required">Profile Image</label>
                                            <input type="file" onChange={inpChnage} name='image' />
                                        </div>
                                    </div>
                                </div>


                                <div className="single-input-item">
                                    <button className="btn btn-sqr w-100 p-3">Update Profile</button>
                                </div>
                            </form>
                        </div>
                    </div>


                </div>
            </Layout >
    )
}

export default AdminProfile
