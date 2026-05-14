import { createStore, applyMiddleware } from "redux";
import FavReducer from "./FavReducer";
import {thunk} from "redux-thunk";
export const store = createStore(FavReducer, applyMiddleware(thunk));