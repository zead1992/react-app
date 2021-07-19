import React, {FC, useEffect} from 'react';
import {Route, Switch, Redirect, RouteChildrenProps} from 'react-router-dom';
import Movies from "./components/Movies";
import Navbar from "./components/common/navbar";
import MovieDetail from "./components/MovieDetail";
import MovieForm from "./components/MovieForm";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import YoutubeFormikForm from "./components/YoutubeFormikForm";
import './App.css';
import {v4 as uuidv4, validate as uuidValidate} from 'uuid';


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
                >
                    {(props: RouteChildrenProps<{ id: string }>) => {
                        const validId = uuidValidate(props.match.params.id);
                        return validId ? <MovieDetail {...props}/> : <Redirect to={'/movies'}/>
                    }}
                </Route>
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
                <Route path={"*"}>
                    <Redirect to={'/movies'}/>
                </Route>
            </Switch>
        </main>
    );
}

export default App;
