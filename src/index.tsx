import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {BrowserRouter, Redirect, Route, RouteChildrenProps, Switch} from "react-router-dom";
import {store} from "./store/store";
import {createMuiTheme, Theme, ThemeProvider} from '@material-ui/core';
import './index.scss';
import "./plugins/i18next/i18n"

const theme: Theme = createMuiTheme({
    palette: {
        primary: {
            main: '#c81616'
        },
        secondary: {
            main: '#63bb08'
        }
    }
})


ReactDOM.render(
    <React.StrictMode>
        <Suspense fallback={"... is loading"}>
            <BrowserRouter>
                <Provider store={store}>
                    <ThemeProvider theme={theme}>
                        <Switch>
                            <Redirect exact
                                      from="/"
                                      to="/en"/>
                            <Route
                                path="/:lang"
                            >
                                { (props: RouteChildrenProps<{ lang: string }>) => {
                                    const lang = props.match.params.lang;
                                    if (lang == 'en' || lang == 'ar') {
                                        return <App {...props}/>
                                    } else {
                                        return <Redirect to={'/en/movies'}/>
                                    }
                                }}
                            </Route>
                        </Switch>
                    </ThemeProvider>
                </Provider>
            </BrowserRouter>
        </Suspense>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
