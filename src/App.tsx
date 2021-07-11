import React, {FC, useEffect} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Movies from "./components/Movies";
import Navbar from "./components/common/navbar";
import MovieDetail from "./components/MovieDetail";
import MovieForm from "./components/MovieForm";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import YoutubeFormikForm from "./components/YoutubeFormikForm";
import './App.css';


const App: FC = () => {


    useEffect(() => {
    }, []);


    return (
        <main className="container py-3">
            <ToastContainer/>
            <Navbar/>

            <Switch>
                <Redirect exact
                          from="/"
                          to="/movies"/>
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
