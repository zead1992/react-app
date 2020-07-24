import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {login} from "./store/actions/authActions";
import {decrement, increment} from "./store/actions/counterActions";
import {RootState} from "./store/reducers/rootReducer";

function App() {

    const {counter, isLogged} = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    //state
    const [inc,setInc] = useState<number>(0);
    const [dec,setDec] = useState<number>(0);


    return (
        <main className="container py-3">
            <h1>Counter: {counter}</h1>
            <input type="number"
                   placeholder="increase by"
                   onChange={(ev)=> setInc(Number(ev.currentTarget.value))}/>
            <button onClick={()=> dispatch(increment(inc))} className="btn btn-primary">
                increase counter
            </button>
            <input type="number"
                   placeholder="decrease by"
                   onChange={(ev)=> setDec(Number(ev.currentTarget.value))}/>
            <button onClick={()=> dispatch(decrement(dec))} className="btn btn-primary">
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
