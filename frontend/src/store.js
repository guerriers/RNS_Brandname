/* eslint-disable */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

import { productsReducer, newProductReducer, productReducer, productDetailsReducer, newReviewReducer, productReviewsReducer, reviewReducer } from './reducers/productReducers'
import { authReducer, userReducer,verifyReducer,adminVerifyReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer } from './reducers/userReducers'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    newProduct: newProductReducer,
    product: productReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
    auth: authReducer,
    user: userReducer,
    verify_status: verifyReducer,
    waitForApprove: adminVerifyReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    forgotPassword: forgotPasswordReducer,
})

const persistConfig = {
    key: 'root',
    storage,
  };
  const persistedReducer = persistReducer(persistConfig, reducer);

let initialState = {

}

const middlware = [thunk];
const store = createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(...middlware)))

const persistor = persistStore(store);

export { store, persistor };