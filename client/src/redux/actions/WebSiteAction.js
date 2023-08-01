import axios from 'axios'
import {
    SLIDER_REQUEST,
    SLIDER_SUCCESS,
    SLIDER_FAIL,

    BANNER_REQUEST,
    BANNER_SUCCESS,
    BANNER_FAIL,

    CATEGORY_REQUEST,
    CATEGORY_SUCCESS,
    CATEGORY_FAIL,

    PRODUCT_REQUEST,
    PRODUCT_SUCCESS,
    PRODUCT_FAIL,

    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,

    PRODUCT_BY_CATEGORY_SUCCESS,
    PRODUCT_BY_CATEGORY_REQUEST,
    PRODUCT_BY_CATEGORY_FAIL,

    FUTURE_PRODUCT_REQUEST,
    FUTURE_PRODUCT_SUCCESS,
    FUTURE_PRODUCT_FAIL,

    SHOP_PRODUCT_REQUEST,
    SHOP_PRODUCT_SUCCESS,
    SHOP_PRODUCT_FAIL,

    PRODUCT_REVIEW_REQUEST,
    PRODUCT_REVIEW_SUCCESS,
    PRODUCT_REVIEW_FAIL,

    PLACE_ORDER_REQUEST,
    PLACE_ORDER_SUCCESS,
    PLACE_ORDER_FAIL,

    CLEAR_ERRORS,
} from '../constants/WebSiteConstant'

export const getSliders = () => async (dispatch) => {
    try {
        dispatch({ type: SLIDER_REQUEST });

        const { data } = await axios.get(`/api/sliders`);
        dispatch({
            type: SLIDER_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: SLIDER_FAIL,
            payload: error.response.data.message
        })
    }
};


export const getBanners = () => async (dispatch) => {
    try {
        dispatch({ type: BANNER_REQUEST });

        const { data } = await axios.get(`/api/banners`);
        dispatch({
            type: BANNER_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: BANNER_FAIL,
            payload: error.response.data.message
        })
    }
};



export const getProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_REQUEST });

        const { data } = await axios.get(`/api/products`);
        dispatch({
            type: PRODUCT_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
};


export const getShopProducts = (keyword = "", currentPage = 1, price = [0, 1000], category, ratings = 0) => async (dispatch) => {
    try {
        dispatch({ type: SHOP_PRODUCT_REQUEST });
        let url = `/api/shopProducts?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        if (category) {
            url = `/api/shopProducts?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }
        const { data } = await axios.get(url);
        dispatch({
            type: SHOP_PRODUCT_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: SHOP_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
};


export const getProductDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAIL_REQUEST });

        const { data } = await axios.get(`/api/product/${id}`);
        dispatch({
            type: PRODUCT_DETAIL_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
};


export const getCategories = () => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_REQUEST });

        const { data } = await axios.get(`/api/categories`);
        dispatch({
            type: CATEGORY_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: CATEGORY_FAIL,
            payload: error.response.data.message
        })
    }
};


export const getProductByCategory = (slug) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_BY_CATEGORY_REQUEST });

        const { data } = await axios.get(`/api/category/${slug}`);
        dispatch({
            type: PRODUCT_BY_CATEGORY_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: PRODUCT_BY_CATEGORY_FAIL,
            payload: error.response.data.message
        })
    }
};


export const getFutureProducts = (slug) => async (dispatch) => {
    try {
        dispatch({ type: FUTURE_PRODUCT_REQUEST });

        const { data } = await axios.get(`/api/futureProducts/`);
        dispatch({
            type: FUTURE_PRODUCT_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: FUTURE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
};



export const ProductReviewFunction = (product_id, comment, rating) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_REVIEW_REQUEST });
        const { data } = await axios.post("/api/user/review/store", {
            product_id, comment, rating,
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: PRODUCT_REVIEW_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_REVIEW_FAIL,
            payload: error.response.data
        })
    }
}

export const placeOrderFunction = (order) => async (dispatch) => {
    try {

        dispatch({ type: PLACE_ORDER_REQUEST });

        const { data } = await axios.post('/api/user/order/store', {
            order
        });
        dispatch({
            type: PLACE_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PLACE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }

}


export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}