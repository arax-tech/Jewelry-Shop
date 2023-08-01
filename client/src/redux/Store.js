import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { authReducer, forgotPasswordReducer, updateProfileReducer } from './reducers/AuthReducer';
import { AdminCategoryReducer } from './reducers/Admin/CategroyReducer';
import { AdminProductsReducer } from './reducers/Admin/ProductReducer';
import { AdminSliderReducer } from './reducers/Admin/SliderReducer';
import { AdminBannerReducer } from './reducers/Admin/BannerReducer';
import { AdminUserReducer } from './reducers/Admin/UserReducer';
import { WebsiteReducer } from './reducers/WebSiteReducer';
import { CartReducer } from './reducers/CartReducer';
import { OrderReducer } from './reducers/User/OrderReducer';
import { AdminOrdersReducer } from './reducers/Admin/OrderReducer';
import { AdminProductReviewReducer } from './reducers/Admin/ReviewReducer';


const reducer = combineReducers({
    // WebSite
    website: WebsiteReducer,
    cart: CartReducer,

    // Auth
    auth: authReducer,
    profile: updateProfileReducer,
    forgotPassword: forgotPasswordReducer,

    // Admin
    adminCategory: AdminCategoryReducer,
    adminProduct: AdminProductsReducer,
    adminReview: AdminProductReviewReducer,
    adminSlider: AdminSliderReducer,
    adminBanner: AdminBannerReducer,
    adminUser: AdminUserReducer,
    adminOrder: AdminOrdersReducer,


    // User
    userOrder: OrderReducer,
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ?
            JSON.parse(localStorage.getItem("cartItems"))
            :
            [],
    }
};

const middleware = [thunk];

const Store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;