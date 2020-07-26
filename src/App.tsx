import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {login} from "./store/actions/authActions";
import {decrement, increment} from "./store/actions/counterActions";
import {RootState} from "./store/reducers/rootReducer";
import {Route, Switch} from 'react-router-dom';
import Movies from "./components/Movies";
import Navbar from "./components/common/navbar";
import MovieDetail from "./components/MovieDetail";
import MovieForm from "./components/MovieForm";
import * as authService from './services/authService';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {

    useEffect(()=>{
        authService.getCurrentUser();
    },[]);

    const {counter, isLogged} = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    //state
    const [inc, setInc] = useState<number>(0);
    const [dec, setDec] = useState<number>(0);


    return (
        <main className="container py-3">
            <ToastContainer/>
            <Navbar/>
            <h1>Counter: {counter}</h1>
            <input type="number"
                   placeholder="increase by"
                   onChange={(ev) => setInc(Number(ev.currentTarget.value))}/>
            <button onClick={() => dispatch(increment(inc))} className="btn btn-primary">
                increase counter
            </button>
            <input type="number"
                   placeholder="decrease by"
                   onChange={(ev) => setDec(Number(ev.currentTarget.value))}/>
            <button onClick={() => dispatch(decrement(dec))} className="btn btn-primary">
                decrement counter
            </button>
            {isLogged && <p>logged user</p>}
            <button
                onClick={() => dispatch(login())}
                className="btn btn-primary my-3">
                login
            </button>
            <Switch>
                <Route
                    path="/movies/new"
                    exact
                    component={MovieForm}
                />
                <Route
                    path="/movies/:id"
                    exact
                    component={MovieDetail}
                />
                <Route
                    path="/movies"
                    exact
                    component={Movies}
                />
            </Switch>
        </main>
    );
}

export default App;
