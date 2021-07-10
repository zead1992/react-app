import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "./reducers/rootReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {loadStorageState, saveStorageState} from "../services/mockStorage";


export const store = createStore(
    rootReducer,
    loadStorageState(),
    composeWithDevTools(applyMiddleware(thunk)),
);

//set store state in storage
store.subscribe(() => {
    saveStorageState({
        ...store.getState()
    });
});
