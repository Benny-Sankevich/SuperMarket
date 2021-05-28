import { combineReducers, createStore } from "redux";
import { authReducer } from "./auth-state";
import { categoriesReducer } from "./categories-state";
import { productsReducer } from "./products-state";
import { itemsReducer } from "./cartItems.state";
import { cartReducer } from "./cart-state";

const reducers = combineReducers({
      productsState: productsReducer, authState: authReducer,
      categoriesState: categoriesReducer, cartState: cartReducer
      , cartItemsState: itemsReducer
})
const store = createStore(reducers);
export default store;