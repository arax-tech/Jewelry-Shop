import {
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,

    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    ORDER_DETAIL_FAIL,

    CLEAR_ERRORS,
} from '../../constants/User/OrderConstant'


export const OrderReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case MY_ORDERS_REQUEST:
        case ORDER_DETAIL_REQUEST:
            return {
                loading: true
            };



        case MY_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload.orders,
                status: action.payload.status
            };
        case ORDER_DETAIL_SUCCESS:
            return {
                loading: false,
                order: action.payload.order,
                status: action.payload.status
            };




        case MY_ORDERS_FAIL:
        case ORDER_DETAIL_FAIL:
            return {
                loading: false,
                errors: action.payload,
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