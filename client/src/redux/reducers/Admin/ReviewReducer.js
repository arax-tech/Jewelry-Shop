import {

    ADMIN_PRODUCT_REVIEW_REQUEST,
    ADMIN_PRODUCT_REVIEW_SUCCESS,
    ADMIN_PRODUCT_REVIEW_FAIL,

    ADMIN_DELETE_PRODUCT_REVIEW_REQUEST,
    ADMIN_DELETE_PRODUCT_REVIEW_SUCCESS,
    ADMIN_DELETE_PRODUCT_REVIEW_RESET,
    ADMIN_DELETE_PRODUCT_REVIEW_FAIL,

    CLEAR_ERRORS
} from '../../constants/Admin/ReviewConstant'

export const AdminProductReviewReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
        case ADMIN_PRODUCT_REVIEW_REQUEST:
        case ADMIN_DELETE_PRODUCT_REVIEW_REQUEST:
            return {
                loading: true,
            };





        case ADMIN_PRODUCT_REVIEW_SUCCESS:
            return {
                loading: false,
                reviews: action.payload.reviews
            };
        case ADMIN_DELETE_PRODUCT_REVIEW_SUCCESS:
            return {
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isDeleted: true,
            };






        case ADMIN_PRODUCT_REVIEW_FAIL:
            return {
                loading: false,
                errors: action.payload,
            };
        case ADMIN_DELETE_PRODUCT_REVIEW_FAIL:
            return {
                loading: false,
                errors: action.payload,
            };





        case ADMIN_DELETE_PRODUCT_REVIEW_RESET:
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


