import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { createAdminCategory } from '../../../redux/actions/Admin/CategoryAction'
import MetaData from '../../layouts/include/MetaData'
import Loading from '../../layouts/include/Loading'
import Layout from '../layouts/Layout'
import { CREATE_CATEGORY_RESET } from '../../../redux/constants/Admin/CategroyConstant'
import { toast } from 'react-toastify'
const AdminCreateCategory = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, isCreated, message } = useSelector((state) => state.adminCategory);

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
    const createCategroy = (event) => {
        event.preventDefault();

        const form = new FormData();
        form.append("name", data.name);
        form.append("slug", data.slug);
        form.append("image", image);
        dispatch(createAdminCategory(form))
    }

    useEffect(() => {
        if (isCreated && isCreated === true) {
            toast.success(message, { theme: "colored" })
            navigate("/admin/category")
            dispatch({ type: CREATE_CATEGORY_RESET })
        }
    }, [dispatch, navigate, isCreated, message]);

    return (
        loading ? <Loading /> :
            <Layout>
                <MetaData title="Admin - Create Category" />
                <div className="col-lg-9 col-md-8">
                    <div className="myaccount-content">
                        <h5>
                            Create Category
                            <span className='float-end'>
                                <Link style={{ marginTop: "-20px" }} className='btn btn-sqr' to="/admin/category">Back</Link>
                            </span>
                        </h5>

                        <div className="account-details-form">
                            <form method='POST' encType='multipart/form-data' onSubmit={createCategroy}>

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
                                    <div className="col-lg-12">
                                        <div className="single-input-item">
                                            <label className="required">Categroy Image</label>
                                            <input type="file" name='image' onChange={inpChnage} required />
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

export default AdminCreateCategory
