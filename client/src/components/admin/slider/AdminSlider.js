import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteAdminSlider, getAdminSliders } from '../../../redux/actions/Admin/SliderAction'
import { DELETE_SLIDER_RESET } from '../../../redux/constants/Admin/SliderConstant'
import Loading from '../../layouts/include/Loading'
import MetaData from '../../layouts/include/MetaData'
import Layout from '../layouts/Layout'

const AdminSlider = () => {
    const dispatch = useDispatch();

    const { loading, sliders, message, isDeleted } = useSelector((state) => state.adminSlider);

    const deleteSlider = (id) => {
        if (window.confirm("Are you sure to delete ?")) {
            dispatch(deleteAdminSlider(id));
        }
    }

    useEffect(() => {
        if (isDeleted && isDeleted === true) {
            toast.error(message, { theme: "colored" });
            dispatch({ type: DELETE_SLIDER_RESET })
        }
        dispatch(getAdminSliders())
    }, [dispatch, isDeleted, message]);

    return (
        loading ? <Loading /> :
            <Layout>
                <MetaData title="Admin - Sliders" />
                <div className="col-lg-9 col-md-8">
                    <div className="myaccount-content">
                        <h5>
                            Sliders
                            <span className='float-end'>
                                <Link style={{ marginTop: "-20px" }} className='btn btn-sqr' to="/admin/slider/create">Create</Link>
                            </span>
                        </h5>

                        <div className="myaccount-table table-responsive text-center">
                            <table className="table table-hover">
                                <thead className="thead-light">
                                    <tr>
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th>Link</th>
                                        <th>Description</th>
                                        <th>Created At</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        sliders?.map((slider, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <img className='img-thumbnail' style={{ width: "50px" }} src={slider.image} alt="" />
                                                </td>
                                                <td>{slider.title.split("<span>")}</td>
                                                <td>{slider.link}</td>
                                                <td>{slider.description.substr(0, 15)}{slider.description.length > 14 && "..."}</td>
                                                <td>{slider.createAt.substr(0, 10)}</td>
                                                <td>
                                                    <div className='btn-broup custon__group'>
                                                        <Link to={`/admin/slider/update/${slider._id}`} className="btn btn-sqr">Update</Link>
                                                        <button onClick={() => deleteSlider(slider._id)} className="btn btn-sqr">Delete</button>
                                                    </div>
                                                </td>
                                            </tr>

                                        ))
                                    }


                                </tbody>
                            </table>
                        </div>
                    </div>


                </div>
            </Layout>
    )
}

export default AdminSlider
