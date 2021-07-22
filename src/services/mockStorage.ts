import {RootState} from "../store/store";
import {getMockRootState} from "../mock-data";

export const loadStorageState = () : RootState | undefined => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            const rootState : RootState = getMockRootState();
            return rootState;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveStorageState = (state : RootState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch {
    }
};