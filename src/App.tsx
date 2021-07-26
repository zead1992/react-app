import React, {FC, useEffect} from 'react';
import {Route, Switch, Redirect, RouteChildrenProps, useRouteMatch, useLocation} from 'react-router-dom';
import Movies from "./components/Movies";
import Navbar from "./components/common/navbar";
import MovieDetail from "./components/MovieDetail";
import MovieForm from "./components/MovieForm";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import YoutubeFormikForm from "./components/YoutubeFormikForm";
import './App.css';
import {isValidUuid} from "./common/common";
import GenresList from "./components/GenresList";
import {useTranslation} from "react-i18next";

type IProp = RouteChildrenProps;
const App: FC<IProp> = (props) => {

    const {i18n} = useTranslation();
    const match = useRouteMatch<{lang:string}>();

    useEffect(() => {
        i18n.changeLanguage(match.params.lang);
    }, []);

    return (
        <main className="container py-3">
            <ToastContainer/>
            <Navbar/>

            <Switch>
                <Redirect exact from={"/:lang"} to={'/:lang/movies'}/>
                <Route
                    path={`${props.match.url}/movies/edit/:id`}
                    exact
                    component={MovieForm}
                >
                    {(props: RouteChildrenProps<{ id: string }>) => {
                        const validId = isValidUuid({id: props.match.params.id});
                        return validId ? <MovieForm {...props}/> : <Redirect to={'/movies'}/>
                    }}
                </Route>
                <Route
                    path={`${props.match.url}/movies/new`}
                    exact
                    component={MovieForm}
                />
                <Route
                    path={`${props.match.url}/movies/:id`}
                    exact
                >
                    {(props: RouteChildrenProps<{ id: string }>) => {
                        const validId = isValidUuid({id: props.match.params.id});
                        return validId ? <MovieDetail {...props}/> : <Redirect to={'/movies'}/>
                    }}
                </Route>
                <Route
                    path={`${props.match.url}/movies`}
                    exact
                    component={Movies}
                />
                <Route path={`${props.match.url}/genres`}
                       exact
                       component={GenresList}/>
                <Route
                    path={`${props.match.url}/formik`}
                    exact
                    component={YoutubeFormikForm}
                />
                <Route path={"*"}>
                    <Redirect to={'/en/movies'}/>
                </Route>
            </Switch>
        </main>
    );
}

export default App;
