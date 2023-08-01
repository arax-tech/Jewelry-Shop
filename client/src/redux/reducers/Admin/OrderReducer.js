import {
    ADMIN_ORDER_REQUEST,
    ADMIN_ORDER_SUCCESS,
    ADMIN_ORDER_FAIL,

    ADMIN_SINGLE_ORDER_REQUEST,
    ADMIN_SINGLE_ORDER_SUCCESS,
    ADMIN_SINGLE_ORDER_FAIL,

    ADMIN_UPDATE_ORDER_REQUEST,
    ADMIN_UPDATE_ORDER_SUCCESS,
    ADMIN_UPDATE_ORDER_RESET,
    ADMIN_UPDATE_ORDER_FAIL,

    ADMIN_DELETE_ORDER_REQUEST,
    ADMIN_DELETE_ORDER_SUCCESS,
    ADMIN_DELETE_ORDER_RESET,
    ADMIN_DELETE_ORDER_FAIL,


    CLEAR_ERRORS
} from '../../constants/Admin/OrderConstant'

export const AdminOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ADMIN_ORDER_REQUEST:
        case ADMIN_SINGLE_ORDER_REQUEST:
        case ADMIN_UPDATE_ORDER_REQUEST:
        case ADMIN_DELETE_ORDER_REQUEST:
            return {
                loading: true
            };



        case ADMIN_ORDER_SUCCESS:
            return {
                loading: false,
                orders: action.payload.orders
            };
        case ADMIN_SINGLE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload.order,
            };
        case ADMIN_UPDATE_ORDER_SUCCESS:
            return {
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isUpdated: true,
            };
        case ADMIN_DELETE_ORDER_SUCCESS:
            return {
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isDeleted: true,
            };







        case ADMIN_ORDER_FAIL:
        case ADMIN_SINGLE_ORDER_FAIL:
        case ADMIN_UPDATE_ORDER_FAIL:
        case ADMIN_DELETE_ORDER_FAIL:
            return {
                loading: false,
                errors: action.payload,
            };





        case ADMIN_UPDATE_ORDER_RESET:
            return {
                loading: false,
                isUpdated: false,
            };
        case ADMIN_DELETE_ORDER_RESET:
            return {
                loading: false,
                isDeleted: false,
            };







        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
}
