import { createStore } from "redux";
import userTokenReducer from "./services/reducers/userTokenReducers";

const store = createStore(userTokenReducer);

export default store;