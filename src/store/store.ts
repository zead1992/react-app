import {applyMiddleware, createStore} from "redux";
import {rootReducer, RootState} from "./reducers/rootReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

export const loadStorageState = () : RootState | undefined => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const saveStorageState = (state : RootState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch {
    }
};

export const store = createStore(
    rootReducer,
    loadStorageState(),
    composeWithDevTools(applyMiddleware(thunk)),
);


store.subscribe(() => {
    saveStorageState({
        ...store.getState()
    });
});
