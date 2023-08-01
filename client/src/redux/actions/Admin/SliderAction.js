import axios from 'axios'
import {
    SLIDER_REQUEST,
    SLIDER_SUCCESS,
    SLIDER_FAIL,

    SINGLE_SLIDER_REQUEST,
    SINGLE_SLIDER_SUCCESS,
    SINGLE_SLIDER_FAIL,

    CREATE_SLIDER_REQUEST,
    CREATE_SLIDER_SUCCESS,
    CREATE_SLIDER_FAIL,

    UPDATE_SLIDER_REQUEST,
    UPDATE_SLIDER_SUCCESS,
    UPDATE_SLIDER_FAIL,

    DELETE_SLIDER_REQUEST,
    DELETE_SLIDER_SUCCESS,
    DELETE_SLIDER_FAIL,

    CLEAR_ERRORS
} from '../../constants/Admin/SliderConstant'

export const getAdminSliders = () => async (dispatch) => {
    try {
        dispatch({ type: SLIDER_REQUEST });

        const { data } = await axios.get('/api/admin/slider');
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

export const singleAdminSlider = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_SLIDER_REQUEST });

        const { data } = await axios.get(`/api/admin/slider/${id}`);
        dispatch({
            type: SINGLE_SLIDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SINGLE_SLIDER_FAIL,
            payload: error.response.data
        })
    }
}


export const createAdminSlider = (form) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_SLIDER_REQUEST });

        const { data } = await axios.post("/api/admin/slider/store", form);
        dispatch({
            type: CREATE_SLIDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_SLIDER_FAIL,
            payload: error.response.data
        })
    }
}


export const updateAdminSlider = (id, form) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_SLIDER_REQUEST });

        const { data } = await axios.patch(`/api/admin/slider/update/${id}`, form);
        dispatch({
            type: UPDATE_SLIDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_SLIDER_FAIL,
            payload: error.response.data
        })
    }
}


export const deleteAdminSlider = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_SLIDER_REQUEST });

        const { data } = await axios.delete(`/api/admin/slider/delete/${id}`);
        dispatch({
            type: DELETE_SLIDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELETE_SLIDER_FAIL,
            payload: error.response.data
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}