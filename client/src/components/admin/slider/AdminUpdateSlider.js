import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import MetaData from '../../layouts/include/MetaData'
import Loading from '../../layouts/include/Loading'
import Layout from '../layouts/Layout'
import { toast } from 'react-toastify'
import { singleAdminSlider, updateAdminSlider } from '../../../redux/actions/Admin/SliderAction'
import { UPDATE_SLIDER_RESET } from '../../../redux/constants/Admin/SliderConstant'
const AdminUpdateSlider = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { loading, isUpdated, message, slider } = useSelector((state) => state.adminSlider);

    const [data, setData] = useState({
        title: "",
        link: "",
        description: "",
    })
    const [image, setImage] = useState('');
    const inpChnage = (event) => {
        if (event.target.name === "image") {
            setImage(event.target.files[0]);
        } else {
            setData({ ...data, [event.target.name]: event.target.value });
        }
    }
    const updateSlider = (event) => {
        event.preventDefault();

        const form = new FormData();
        form.append("title", data.title);
        form.append("description", data.description);
        form.append("link", data.link);
        form.append("image", image);
        dispatch(updateAdminSlider(id, form))
    }

    useEffect(() => {
        if (isUpdated && isUpdated === true) {
            toast.success(message, { theme: "colored" })
            navigate("/admin/slider")
            dispatch({ type: UPDATE_SLIDER_RESET })
        }



        if (slider?._id !== id) {
            dispatch(singleAdminSlider(id))
        } else {
            setData({
                title: slider.title,
                link: slider.link,
                description: slider.description,
            });
            setImage(slider.image);
        }
    }, [dispatch, navigate, isUpdated, message, slider, id]);

    return (
        loading ? <Loading /> :
            <Layout>
                <MetaData title="Admin - Update Slider" />
                <div className="col-lg-9 col-md-8">
                    <div className="myaccount-content">
                        <h5>
                            Update Slider
                            <span className='float-end'>
                                <Link style={{ marginTop: "-20px" }} className='btn btn-sqr' to="/admin/slider">Back</Link>
                            </span>
                        </h5>

                        <div className="account-details-form">
                            <form method='POST' encType='multipart/form-data' onSubmit={updateSlider}>

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
                                            <label className="required">Description</label>
                                            <input type="text" name='description' value={data.description} onChange={inpChnage} required />
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
                                            <img className='img-thumbnail w-100' src={slider?.image} alt="" />
                                        </div>
                                    </div>

                                </div>


                                <div className="single-input-item">
                                    <button className="btn btn-sqr w-100 p-3">Update Slider</button>
                                </div>
                            </form>
                        </div>
                    </div>


                </div>
            </Layout>
    )
}

export default AdminUpdateSlider
