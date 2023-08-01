import {
    SLIDER_REQUEST,
    SLIDER_SUCCESS,
    SLIDER_FAIL,

    SINGLE_SLIDER_REQUEST,
    SINGLE_SLIDER_SUCCESS,
    SINGLE_SLIDER_FAIL,

    CREATE_SLIDER_REQUEST,
    CREATE_SLIDER_SUCCESS,
    CREATE_SLIDER_RESET,
    CREATE_SLIDER_FAIL,

    UPDATE_SLIDER_REQUEST,
    UPDATE_SLIDER_SUCCESS,
    UPDATE_SLIDER_RESET,
    UPDATE_SLIDER_FAIL,

    DELETE_SLIDER_REQUEST,
    DELETE_SLIDER_SUCCESS,
    DELETE_SLIDER_RESET,
    DELETE_SLIDER_FAIL,


    CLEAR_ERRORS
} from '../../constants/Admin/SliderConstant'


export const AdminSliderReducer = (state = {}, action) => {
    switch (action.type) {
        case SLIDER_REQUEST:
        case SINGLE_SLIDER_REQUEST:
        case CREATE_SLIDER_REQUEST:
        case UPDATE_SLIDER_REQUEST:
        case DELETE_SLIDER_REQUEST:
            return {
                loading: true,
            };






        case SLIDER_SUCCESS:
            return {
                ...state,
                loading: false,
                sliders: action.payload.sliders,
            };

        case SINGLE_SLIDER_SUCCESS:
            return {
                ...state,
                loading: false,
                slider: action.payload.slider,
            };

        case CREATE_SLIDER_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isCreated: true,
            };

        case UPDATE_SLIDER_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isUpdated: true,
            };
        case DELETE_SLIDER_SUCCESS:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                message: action.payload.message,
                isDeleted: true,
            };


        case SLIDER_FAIL:
        case SINGLE_SLIDER_FAIL:
        case CREATE_SLIDER_FAIL:
        case UPDATE_SLIDER_FAIL:
        case DELETE_SLIDER_FAIL:
            return {
                ...state,
                loading: false,
                status: action.payload.status,
                errors: action.payload,
            };






        case CREATE_SLIDER_RESET:
            return {
                loading: false,
                isCreated: false,
            };
        case UPDATE_SLIDER_RESET:
            return {
                loading: false,
                isUpdated: false,
            };
        case DELETE_SLIDER_RESET:
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
