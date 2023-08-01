import {
    BANNER_REQUEST,
    BANNER_SUCCESS,
    BANNER_FAIL,

    SINGLE_BANNER_REQUEST,
    SINGLE_BANNER_SUCCESS,
    SINGLE_BANNER_FAIL,

    CREATE_BANNER_REQUEST,
    CREATE_BANNER_SUCCESS,
    CREATE_BANNER_RESET,
    CREATE_BANNER_FAIL,

    UPDATE_BANNER_REQUEST,
    UPDATE_BANNER_SUCCESS,
    UPDATE_BANNER_RESET,
    UPDATE_BANNER_FAIL,

    DELETE_BANNER_REQUEST,
    DELETE_BANNER_SUCCESS,
    DELETE_BANNER_RESET,
    DELETE_BANNER_FAIL,


    CLEAR_ERRORS
} from '../../constants/Admin/BannerConstant'


export const AdminBannerReducer = (state = {}, action) => {
    switch (action.type) {
        case BANNER_REQUEST:
        case SINGLE_BANNER_REQUEST:
        case CREATE_BANNER_REQUEST:
        case UPDATE_BANNER_REQUEST:
        case DELETE_BANNER_REQUEST:
            return {
                loading: true,
            };






        case BANNER_SUCCESS:
            return {
                ...state,
                loading: false,
                banners: action.payload.banners,
            };

        case SINGLE_BANNER_SUCCESS:
            return {
                ...state,
                loading: false,
                banner: action.payload.banner,
            };

        case CREATE_BANNER_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isCreated: true,
            };

        case UPDATE_BANNER_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isUpdated: true,
            };
        case DELETE_BANNER_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isDeleted: true,
            };


        case BANNER_FAIL:
        case SINGLE_BANNER_FAIL:
        case CREATE_BANNER_FAIL:
        case UPDATE_BANNER_FAIL:
        case DELETE_BANNER_FAIL:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                errors: action.payload,
            };






        case CREATE_BANNER_RESET:
            return {
                loading: false,
                isCreated: false,
            };
        case UPDATE_BANNER_RESET:
            return {
                loading: false,
                isUpdated: false,
            };
        case DELETE_BANNER_RESET:
            return {
                loading: false,
                isDeleted: false,
            };



        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null,
            };

        default:
            return state;
    }
}
