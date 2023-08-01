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

    PRODUCT_BY_CATEGORY_REQUEST,
    PRODUCT_BY_CATEGORY_SUCCESS,
    PRODUCT_BY_CATEGORY_FAIL,

    PRODUCT_REQUEST,
    PRODUCT_SUCCESS,
    PRODUCT_FAIL,

    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,

    SALE_PRODUCT_REQUEST,
    SALE_PRODUCT_SUCCESS,
    SALE_PRODUCT_FAIL,


    FUTURE_PRODUCT_REQUEST,
    FUTURE_PRODUCT_SUCCESS,
    FUTURE_PRODUCT_FAIL,

    SHOP_PRODUCT_REQUEST,
    SHOP_PRODUCT_SUCCESS,
    SHOP_PRODUCT_FAIL,

    PRODUCT_REVIEW_REQUEST,
    PRODUCT_REVIEW_SUCCESS,
    PRODUCT_REVIEW_RESET,
    PRODUCT_REVIEW_FAIL,


    PLACE_ORDER_REQUEST,
    PLACE_ORDER_SUCCESS,
    PLACE_ORDER_RESET,
    PLACE_ORDER_FAIL,

    CLEAR_ERRORS,
} from '../constants/WebSiteConstant'


export const WebsiteReducer = (state = {}, action) => {
    switch (action.type) {
        case SLIDER_REQUEST:
        case BANNER_REQUEST:
        case CATEGORY_REQUEST:
        case PRODUCT_BY_CATEGORY_REQUEST:
        case PRODUCT_REQUEST:
        case PRODUCT_DETAIL_REQUEST:
        case SALE_PRODUCT_REQUEST:
        case FUTURE_PRODUCT_REQUEST:
        case SHOP_PRODUCT_REQUEST:
        case PRODUCT_REVIEW_REQUEST:
        case PLACE_ORDER_REQUEST:
            return {
                loading: true,
            };






        case SLIDER_SUCCESS:
            return {
                ...state,
                loading: false,
                sliders: action.payload.sliders,
            };
        case BANNER_SUCCESS:
            return {
                ...state,
                loading: false,
                banners: action.payload.banners,
            };
        case CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: action.payload.categories,
            };
        case PRODUCT_BY_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                categroyProducts: action.payload.categroyProducts,
            };
        case PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload.products,
            };
        case SHOP_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                shopProducts: action.payload.shopProducts,
                resultPerPage: action.payload.resultPerPage,
                productsCount: action.payload.productsCount,
                shopCategories: action.payload.shopCategories,
            };
        case PRODUCT_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.payload.product,
                relatedProducts: action.payload.relatedProducts,
            };
        case SALE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                onSaleProducts: action.payload.onSaleProducts,
            };
        case FUTURE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                futureProducts: action.payload.futureProducts,
            };

        case PRODUCT_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                isReviewed: true,
                status: action.payload.status,
                message: action.payload.message,
            };
        case PLACE_ORDER_SUCCESS:
            return {
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isPlaced: true,
            };




        case SLIDER_FAIL:
        case BANNER_FAIL:
        case CATEGORY_FAIL:
        case PRODUCT_BY_CATEGORY_FAIL:
        case PRODUCT_FAIL:
        case PRODUCT_DETAIL_FAIL:
        case SALE_PRODUCT_FAIL:
        case FUTURE_PRODUCT_FAIL:
        case SHOP_PRODUCT_FAIL:
        case PRODUCT_REVIEW_FAIL:
        case PLACE_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                errors: action.payload,
            };





        case PRODUCT_REVIEW_RESET:
            return {
                ...state,
                isReviewed: false,
            };
        case PLACE_ORDER_RESET:
            return {
                loading: false,
                isPlaced: false,
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