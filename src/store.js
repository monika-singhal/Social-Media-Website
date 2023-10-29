import { createStore } from "redux";
import cartReducer from "./Redux/reducers/reducers";

const store = createStore(cartReducer);

export default store;