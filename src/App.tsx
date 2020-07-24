import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {login} from "./store/actions/authActions";
import {decrement, increment} from "./store/actions/counterActions";
import {RootState} from "./store/reducers/rootReducer";

function App() {

    const {counter, isLogged} = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    return (
        <main className="container py-3">
            <h1>Counter: {counter}</h1>
            <button onClick={()=> dispatch(increment())} className="btn btn-primary">
                increase counter
            </button>
            <button onClick={()=> dispatch(decrement())} className="btn btn-primary">
                decrement counter
            </button>
            {isLogged && <p>logged user</p>}
            <button
                onClick={() => dispatch(login())}
                className="btn btn-primary my-3">
                login
            </button>
        </main>
    );
}

export default App;
