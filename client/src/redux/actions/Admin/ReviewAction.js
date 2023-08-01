import axios from 'axios'
import {
    ADMIN_PRODUCT_REVIEW_REQUEST,
    ADMIN_PRODUCT_REVIEW_SUCCESS,
    ADMIN_PRODUCT_REVIEW_FAIL,

    ADMIN_DELETE_PRODUCT_REVIEW_REQUEST,
    ADMIN_DELETE_PRODUCT_REVIEW_SUCCESS,
    ADMIN_DELETE_PRODUCT_REVIEW_FAIL,


    CLEAR_ERRORS
} from '../../constants/Admin/ReviewConstant'

export const getAdminProductReviews = (id) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_PRODUCT_REVIEW_REQUEST });

        const { data } = await axios.get(`/api/admin/review/${id}`);
        dispatch({
            type: ADMIN_PRODUCT_REVIEW_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: ADMIN_PRODUCT_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
};


export const deleteAdminProductReview = (product_id, review_id) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_DELETE_PRODUCT_REVIEW_REQUEST });

        const { data } = await axios.delete(`/api/admin/review/delete/${product_id}/${review_id}`);
        dispatch({
            type: ADMIN_DELETE_PRODUCT_REVIEW_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ADMIN_DELETE_PRODUCT_REVIEW_FAIL,
            payload: error.response.data
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}