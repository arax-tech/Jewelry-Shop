import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getAdminCategories } from '../../../redux/actions/Admin/CategoryAction'
import MetaData from '../../layouts/include/MetaData'
import Loading from '../../layouts/include/Loading'
import Layout from '../layouts/Layout'
import { toast } from 'react-toastify'
import { createAdminProduct } from '../../../redux/actions/Admin/ProductAction'

import Select from 'react-select'
import { CREATE_PRODUCT_RESET } from '../../../redux/constants/Admin/ProductConstant'

const AdminCreateProduct = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, categories } = useSelector((state) => state.adminCategory);
    const { loading: createLoading, isCreated, message } = useSelector((state) => state.adminProduct);

    const [product, setProduct] = useState({
        name: "",
        category: "",
        price: "",
        stock: "",
        onSale: "",
        salePercentage: "",
        futureProduct: "",
        description: "",
    });

    const [colors, setColors] = useState();
    const [sizes, setSizes] = useState();


    const colorsArray = [
        { value: 'c-lightblue', label: 'Light Blue' },
        { value: 'c-darktan', label: 'Darktan' },
        { value: 'c-grey', label: 'Gray' },
        { value: 'c-brown', label: 'Brown' },
        { value: 'c-gold', label: 'Gold' },
    ]
    const sizesArray = [
        { value: 'S', label: 'S' },
        { value: 'M', label: 'M' },
        { value: 'L', label: 'L' },
        { value: 'XL', label: 'XL' },
    ]


    const handleColors = (event) => {
        setColors(Array.isArray(event) ? event.map(item => item.value) : []);
    }
    const handleSizes = (event) => {
        setSizes(Array.isArray(event) ? event.map(item => item.value) : []);
    }

    const [images, setImages] = useState();
    const [previewImages, setPreviewImages] = useState();


    const inpChnage = (event) => {
        if (event.target.name === "images") {
            setImages(event.target.files)

            const files = Array.from(event.target.files);

            setPreviewImages([]);

            files.forEach((file) => {
                const reader = new FileReader();
                reader.onload = () => {
                    if (reader.readyState === 2) {
                        setPreviewImages((old) => [...old, reader.result]);
                    }
                };
                reader.readAsDataURL(file);
            });
        } else {
            setProduct({ ...product, [event.target.name]: event.target.value })
        }
    }


    const ProductFormSubmit = (event) => {
        event.preventDefault();
        const form = new FormData();
        form.append("name", product.name);
        form.append("category", product.category);
        form.append("price", product.price);
        form.append("stock", product.stock);
        form.append("onSale", product.onSale);
        form.append("salePercentage", product.salePercentage);
        form.append("futureProduct", product.futureProduct);
        form.append("description", product.description);
        form.append("colors", colors);
        form.append("sizes", sizes);
        Object.values(images).forEach(image => {
            form.append("images", image);
        });
        dispatch(createAdminProduct(form))
    }

    useEffect(() => {
        if (isCreated && isCreated === true) {
            toast.success(message, { theme: "colored" })
            navigate("/admin/product")
            dispatch({ type: CREATE_PRODUCT_RESET })
        }
        dispatch(getAdminCategories())

    }, [dispatch, navigate, isCreated, message]);

    return (
        loading || createLoading ? <Loading /> :
            <Layout>
                <MetaData title="Admin - Create Product" />
                <div className="col-lg-9 col-md-8">
                    <div className="myaccount-content">
                        <h5>
                            Create Product
                            <span className='float-end'>
                                <Link style={{ marginTop: "-20px" }} className='btn btn-sqr' to="/admin/product">Back</Link>
                            </span>
                        </h5>

                        <div className="account-details-form">
                            <form method='POST' encType='multipart/form-data' onSubmit={ProductFormSubmit}>

                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="single-input-item">
                                            <label className="required">Name</label>
                                            <input type="text" name='name' value={product.name} onChange={inpChnage} required />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="single-input-item">
                                            <label className="required">Categroy</label>
                                            <select name='category' value={product.category} onChange={inpChnage} required>
                                                {
                                                    categories?.map((category, index) => (
                                                        <option key={index} value={category._id}>{category.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="single-input-item">
                                            <label className="required">Price</label>
                                            <input type="number" onChange={inpChnage} value={product.price} name='price' required />
                                        </div>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="single-input-item">
                                            <label className="required">Stock</label>
                                            <input type="number" onChange={inpChnage} value={product.stock} name='stock' required />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="single-input-item">
                                            <label className="required">On Sale</label>
                                            <select onChange={inpChnage} value={product.onSale} name='onSale' required>
                                                <option value="No">No</option>
                                                <option value="Yes">Yes</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="single-input-item">
                                            <label className="required">Sale Percentage</label>
                                            <input type="number" onChange={inpChnage} value={product.salePercentage} name='salePercentage' required />
                                        </div>
                                    </div>

                                </div>
                                <div className="row">

                                    <div className="col-lg-4">
                                        <div className="single-input-item">
                                            <label className="required">Future Product</label>
                                            <select onChange={inpChnage} value={product.futureProduct} name='futureProduct' required>
                                                <option value="No">No</option>
                                                <option value="Yes">Yes</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="single-input-item">
                                            <label className="required">Description</label>
                                            <input type="text" onChange={inpChnage} value={product.description} name='description' required />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="single-input-item">
                                            <label className="required">Images </label><span className='text-danger'> Only 5 Images Allowed...</span>
                                            <input type="file" multiple onChange={inpChnage} name='images' required />
                                        </div>
                                    </div>

                                </div>

                                {
                                    previewImages && (
                                        <div className="col-md-12  col-sm-12 mb-3">
                                            <div className="form-group row">
                                                <label>Choosed Images</label>
                                                {


                                                    previewImages && previewImages.map((file, index) => (
                                                        <div key={index} className='col-lg-3 mb-2' style={{ width: "20%" }}>
                                                            <img className='img-thumbnail shadow-sm w-100' src={file} alt="" />
                                                        </div>
                                                    ))



                                                }

                                            </div>
                                        </div>

                                    )
                                }
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="single-input-item">
                                            <label className="required">Colors</label>
                                            <Select
                                                placeholder="Choose..."
                                                isMulti
                                                options={colorsArray}
                                                onChange={handleColors}
                                            />

                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="single-input-item">
                                            <label className="required">Sizes</label>
                                            <Select
                                                placeholder="Choose..."
                                                isMulti
                                                options={sizesArray}
                                                onChange={handleSizes}
                                            />
                                        </div>
                                    </div>

                                </div>


                                <div className="single-input-item">
                                    <button className="btn btn-sqr w-100 p-3">Create Product</button>
                                </div>
                            </form>
                        </div>
                    </div>


                </div>
            </Layout>
    )
}

export default AdminCreateProduct
