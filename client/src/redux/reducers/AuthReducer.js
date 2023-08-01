import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_RESET,

    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    REGISTER_RESET,

    AUTH_USER_REQUEST,
    AUTH_USER_SUCCESS,
    AUTH_USER_FAIL,



    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_RESET,

    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_RESET,

    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_RESET,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_RESET,

    AUTH_LOGOUT_SUCCESS,
    AUTH_LOGOUT_FAIL,

    CLEAR_ERRORS,
} from '../constants/AuthConstant'


export const authReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case AUTH_USER_REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                message: action.payload.message,
                status: action.payload.status,
                user: action.payload.user,
                isLoggedIn: true
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                message: action.payload.message,
                status: action.payload.status,
                user: action.payload.user,
                isRegistered: true
            };


        case AUTH_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
            };

        case AUTH_LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                message: action.payload.message,
                status: action.payload.status,
                user: null,
            };



        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case AUTH_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                message: action.payload.message,
                status: action.payload.status,
                errors: action.payload,
            };
        case AUTH_LOGOUT_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                errors: action.payload,
            };
        case LOGIN_RESET:
            return {
                isLoggedIn: false
            };
        case REGISTER_RESET:
            return {
                isRegistered: false
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null

            }

        default:
            return state;
    }
}

export const updateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
                isUpdated: true,
            };
        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
                errors: action.payload,
            };
        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null,
                status: null
            };

        default:
            return state;
    }
}


export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                errors: null
            };

        case FORGOT_PASSWORD_SUCCESS:
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
                isUpdated: true,
            };


        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
                isUpdated: false,
                errors: action.payload,
            };
        case FORGOT_PASSWORD_RESET:
        case RESET_PASSWORD_RESET:
            return {
                ...state,
                status: null,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            };

        default:
            return state;
    }
}