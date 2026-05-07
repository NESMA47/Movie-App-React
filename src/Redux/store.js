import { createStore } from "redux";
import FavReducer from "./FavReducer";
export const store = createStore(FavReducer);