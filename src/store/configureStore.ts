import {applyMiddleware, combineReducers, createStore} from "redux";
import mapReducer from "./reducers/mapReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  mapData: mapReducer
})

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
