import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Typography} from "antd";
import MovieCard from "./common/MovieCard";
import {fetchMoviesAsync, selectAllMovies} from "../features/movies/moviesSlice";
import {useTranslation} from "react-i18next";
import MoviesFilter from "./common/MoviesFilter";

const {Title, Text} = Typography;

function Movies(props: any) {

    const {i18n,t} = useTranslation(['web','common']);

    const dispatch = useDispatch();
    const {list: movies} = useSelector(selectAllMovies);
    const [refreshMovie, setRefreshMovie] = useState(false);

    useEffect(() => {
        dispatch(fetchMoviesAsync());
    }, [refreshMovie]);

    return (
        <div className="row my-3">
            <div className="col-12 mb-3">
                <Button disabled={movies.status === 'loading'}
                        type="primary"
                        onClick={() => setRefreshMovie(!refreshMovie)}
                >{t('common:refresh')}</Button>
            </div>
            {
                movies.status == 'idle' &&
                <MoviesFilter/>
            }
            <div className="col-12">
                <div className="row align-items-start justify-content-start">
                    {
                        movies.status==='loading' &&
                        <div className="col-4">
                            <Card loading={movies.status=== 'loading'}></Card>
                        </div>
                    }
                    {
                        movies.status !=='loading' && movies.data && Object.values(movies.data).map((movie) =>
                            <div className="col-4 mb-3" key={movie._id}>
                                <MovieCard movie={movie}/>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>

    );
}

export default Movies;