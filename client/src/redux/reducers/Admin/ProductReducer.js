import {
    PRODUCT_REQUEST,
    PRODUCT_SUCCESS,
    PRODUCT_FAIL,

    SINGLE_PRODUCT_REQUEST,
    SINGLE_PRODUCT_SUCCESS,
    SINGLE_PRODUCT_FAIL,

    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_RESET,
    CREATE_PRODUCT_FAIL,

    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_FAIL,

    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_RESET,
    DELETE_PRODUCT_FAIL,


    CLEAR_ERRORS
} from '../../constants/Admin/ProductConstant'

export const AdminProductsReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_REQUEST:
        case SINGLE_PRODUCT_REQUEST:
        case CREATE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
        case DELETE_PRODUCT_REQUEST:
            return {
                loading: true,
            };




        case PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
            };
        case SINGLE_PRODUCT_SUCCESS:
            return {
                loading: false,
                product: action.payload.product,
            };
        case CREATE_PRODUCT_SUCCESS:
            return {
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isCreated: true,
            };
        case UPDATE_PRODUCT_SUCCESS:
            return {
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isUpdated: true,
            };
        case DELETE_PRODUCT_SUCCESS:
            return {
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isDeleted: true,
            };




        case PRODUCT_FAIL:
        case SINGLE_PRODUCT_FAIL:
        case CREATE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
        case DELETE_PRODUCT_FAIL:
            return {
                loading: false,
                errors: action.payload,
            };







        case CREATE_PRODUCT_RESET:
            return {
                isCreated: false,
            };
        case UPDATE_PRODUCT_RESET:
            return {
                isUpdated: false,
            };
        case DELETE_PRODUCT_RESET:
            return {
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