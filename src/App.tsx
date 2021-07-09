import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {Route, Switch} from 'react-router-dom';
import Movies from "./components/Movies";
import Navbar from "./components/common/navbar";
import MovieDetail from "./components/MovieDetail";
import MovieForm from "./components/MovieForm";
import * as authService from './services/authService';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import YoutubeFormikForm from "./components/YoutubeFormikForm";
import './App.css';

type IProps = {
    startCounterFrom:number;
}



function App(props:  IProps) {


    const dispatch = useDispatch();

    useEffect(() => {
        authService.getCurrentUser();
    }, []);


    return (
        <main className="container py-3">
            <ToastContainer/>
            <Navbar/>

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
                <Route
                    path="/formik"
                    exact
                    component={YoutubeFormikForm}
                />
            </Switch>
        </main>
    );
}

export default App;
