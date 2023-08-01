import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteAdminBanner, getAdminBanners } from '../../../redux/actions/Admin/BannerAction'
import { DELETE_BANNER_RESET } from '../../../redux/constants/Admin/BannerConstant'
import Loading from '../../layouts/include/Loading'
import MetaData from '../../layouts/include/MetaData'
import Layout from '../layouts/Layout'

const AdminBanner = () => {
    const dispatch = useDispatch();

    const { loading, banners, message, isDeleted } = useSelector((state) => state.adminBanner);

    const deleteBanner = (id) => {
        if (window.confirm("Are you sure to delete ?")) {
            dispatch(deleteAdminBanner(id));
        }
    }

    useEffect(() => {
        if (isDeleted && isDeleted === true) {
            toast.error(message, { theme: "colored" });
            dispatch({ type: DELETE_BANNER_RESET })
        }
        dispatch(getAdminBanners())
    }, [dispatch, isDeleted, message]);

    return (
        loading ? <Loading /> :
            <Layout>
                <MetaData title="Admin - Banners" />
                <div className="col-lg-9 col-md-8">
                    <div className="myaccount-content">
                        <h5>
                            Banners
                            <span className='float-end'>
                                <Link style={{ marginTop: "-20px" }} className='btn btn-sqr' to="/admin/banner/create">Create</Link>
                            </span>
                        </h5>

                        <div className="myaccount-table table-responsive text-center">
                            <table className="table table-hover">
                                <thead className="thead-light">
                                    <tr>
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th>Link</th>
                                        <th>Tag</th>
                                        <th>Created At</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        banners?.map((banner, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <img className='img-thumbnail' style={{ width: "50px" }} src={banner.image} alt="" />
                                                </td>
                                                <td>{banner.title.split("<span>")}</td>
                                                <td>{banner.link}</td>
                                                <td>{banner.tag}</td>
                                                <td>{banner.createAt.substr(0, 10)}</td>
                                                <td>
                                                    <div className='btn-broup custon__group'>
                                                        <Link to={`/admin/banner/update/${banner._id}`} className="btn btn-sqr">Update</Link>
                                                        <button onClick={() => deleteBanner(banner._id)} className="btn btn-sqr">Delete</button>
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

export default AdminBanner
