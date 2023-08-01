import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { singleAdminCategory, updateAdminCategory } from '../../../redux/actions/Admin/CategoryAction'
import MetaData from '../../layouts/include/MetaData'
import Loading from '../../layouts/include/Loading'
import Layout from '../layouts/Layout'
import { UPDATE_CATEGORY_RESET } from '../../../redux/constants/Admin/CategroyConstant'
import { toast } from 'react-toastify'
const AdminUpdateCategory = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { loading, message, category, isUpdated } = useSelector((state) => state.adminCategory);

    const [data, setData] = useState({
        name: "",
        slug: "",
    })
    const [image, setImage] = useState('');
    const inpChnage = (event) => {
        if (event.target.name === "image") {
            setImage(event.target.files[0]);
        } else {
            setData({ ...data, [event.target.name]: event.target.value });
        }
    }
    const updateCategroy = (event) => {
        event.preventDefault();

        const form = new FormData();
        form.append("name", data.name);
        form.append("slug", data.slug);
        form.append("image", image);
        dispatch(updateAdminCategory(id, form))
    }

    useEffect(() => {

        if (category?._id !== id) {
            dispatch(singleAdminCategory(id))
        } else {
            setData({
                name: category && category.name,
                slug: category && category.slug,
            })
            setImage(category && category.image);
        }

        if (isUpdated && isUpdated === true) {
            toast.success(message, { theme: "colored" })
            navigate("/admin/category")
            dispatch({ type: UPDATE_CATEGORY_RESET })
        }


    }, [dispatch, navigate, message, category, id, isUpdated]);

    return (
        loading ? <Loading /> :
            <Layout>
                <MetaData title="Admin - Update Category" />
                <div className="col-lg-9 col-md-8">
                    <div className="myaccount-content">
                        <h5>
                            Update Category
                            <span className='float-end'>
                                <Link style={{ marginTop: "-20px" }} className='btn btn-sqr' to="/admin/category">Back</Link>
                            </span>
                        </h5>

                        <div className="account-details-form">
                            <form method='POST' encType='multipart/form-data' onSubmit={updateCategroy}>

                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="single-input-item">
                                            <label className="required">Categroy Name</label>
                                            <input type="text" name='name' value={data.name} onChange={inpChnage} required />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="single-input-item">
                                            <label className="required">Categroy Slug</label>
                                            <input type="text" name='slug' value={data.slug} onChange={inpChnage} required />
                                        </div>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-lg-10">
                                        <div className="single-input-item">
                                            <label className="required">Categroy Image</label>
                                            <input type="file" name='image' onChange={inpChnage} />
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="single-input-item">
                                            <label className="required">Old Image</label>
                                            <img className='img-thumbnail' style={{ width: "50px" }} src={category?.image} alt="" />
                                        </div>
                                    </div>

                                </div>


                                <div className="single-input-item">
                                    <button className="btn btn-sqr w-100 p-3">Create Categroy</button>
                                </div>
                            </form>
                        </div>
                    </div>


                </div>
            </Layout>
    )
}

export default AdminUpdateCategory
