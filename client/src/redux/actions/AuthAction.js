import axios from 'axios'
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,

    AUTH_USER_REQUEST,
    AUTH_USER_SUCCESS,
    AUTH_USER_FAIL,

    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,

    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,

    AUTH_LOGOUT_SUCCESS,
    AUTH_LOGOUT_FAIL,

    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,

    CLEAR_ERRORS,
} from '../constants/AuthConstant'

export const LoginFunction = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const { data } = await axios.post("/api/auth/login", {
            email, password,
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data

        })
    }
}

export const RegisterFunction = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST });
        const { data } = await axios.post("/api/auth/register", {
            name, email, password,
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: REGISTER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data

        })
    }
}


export const AuthUser = () => async (dispatch) => {
    try {

        dispatch({ type: AUTH_USER_REQUEST });

        const role = localStorage.getItem("role");

        const { data } = await axios.get(`/api/${role}/profile`)
        dispatch({
            type: AUTH_USER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: AUTH_USER_FAIL,
            payload: error.response.data
        })

    }
}


export const ProfileUpdateFunction = (form) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });
        const role = localStorage.getItem("role");

        const { data } = await axios.patch(`/api/${role}/profile`, form);
        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data
        })
    }
}


export const PasswordUpdateFunction = (current_password, new_password) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });
        const role = localStorage.getItem("role");
        const { data } = await axios.patch(`/api/${role}/password/update`, {
            current_password, new_password,
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data
        })
    }
}

export const AuthLogout = () => async (dispatch) => {
    try {

        const { data } = await axios.get("/api/auth/logout");
        dispatch({
            type: AUTH_LOGOUT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: AUTH_LOGOUT_FAIL,
            payload: error.response.data
        })
    }
}



export const ForgotPasswordFunction = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const { data } = await axios.post("/api/auth/password/forgot", {
            email,
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data
        })
    }
}

export const RestPasswordFunction = (token, password) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });

        const { data } = await axios.put(`/api/auth/password/reset/${token}`, {
            password,
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response.data
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}