import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import MetaData from '../../layouts/include/MetaData'
import Loading from '../../layouts/include/Loading'
import Layout from '../layouts/Layout'
import { toast } from 'react-toastify'
import { singleAdminBanner, updateAdminBanner } from '../../../redux/actions/Admin/BannerAction'
import { UPDATE_BANNER_RESET } from '../../../redux/constants/Admin/BannerConstant'
const AdminUpdateBanner = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { loading, isUpdated, message, banner } = useSelector((state) => state.adminBanner);

    const [data, setData] = useState({
        title: "",
        link: "",
        tag: "",
    })
    const [image, setImage] = useState('');
    const inpChnage = (event) => {
        if (event.target.name === "image") {
            setImage(event.target.files[0]);
        } else {
            setData({ ...data, [event.target.name]: event.target.value });
        }
    }
    const updateBanner = (event) => {
        event.preventDefault();

        const form = new FormData();
        form.append("title", data.title);
        form.append("tag", data.tag);
        form.append("link", data.link);
        form.append("image", image);
        dispatch(updateAdminBanner(id, form))
    }

    useEffect(() => {
        if (isUpdated && isUpdated === true) {
            toast.success(message, { theme: "colored" })
            navigate("/admin/banner")
            dispatch({ type: UPDATE_BANNER_RESET })
        }



        if (banner?._id !== id) {
            dispatch(singleAdminBanner(id))
        } else {
            setData({
                title: banner.title,
                link: banner.link,
                tag: banner.tag,
            });
            setImage(banner.image);
        }
    }, [dispatch, navigate, isUpdated, message, banner, id]);

    return (
        loading ? <Loading /> :
            <Layout>
                <MetaData title="Admin - Update Banner" />
                <div className="col-lg-9 col-md-8">
                    <div className="myaccount-content">
                        <h5>
                            Update Banner
                            <span className='float-end'>
                                <Link style={{ marginTop: "-20px" }} className='btn btn-sqr' to="/admin/banner">Back</Link>
                            </span>
                        </h5>

                        <div className="account-details-form">
                            <form method='POST' encType='multipart/form-data' onSubmit={updateBanner}>

                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="single-input-item">
                                            <label className="required">Title</label>
                                            <input type="text" name='title' value={data.title} onChange={inpChnage} required />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="single-input-item">
                                            <label className="required">Link</label>
                                            <input type="text" name='link' value={data.link} onChange={inpChnage} required />
                                        </div>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="single-input-item">
                                            <label className="required">Tag</label>
                                            <input type="text" name='tag' value={data.tag} onChange={inpChnage} required />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="single-input-item">
                                            <label>Image</label>
                                            <input type="file" name='image' onChange={inpChnage} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="single-input-item">
                                            <label className="required">Old Image</label>
                                            <img className='img-thumbnail w-100' src={banner?.image} alt="" />
                                        </div>
                                    </div>

                                </div>


                                <div className="single-input-item">
                                    <button className="btn btn-sqr w-100 p-3">Update Banner</button>
                                </div>
                            </form>
                        </div>
                    </div>


                </div>
            </Layout>
    )
}

export default AdminUpdateBanner
