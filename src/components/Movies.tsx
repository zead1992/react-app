import React, {useEffect, useState} from 'react';
import {addMovie, fetchMoviesAsync, fetchMoviesListSuccess} from "../store/reducers/movieReducer";
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Typography} from "antd";
import MovieCard from "./common/MovieCard";
import {RootState} from "../store/store";

const {Title, Text} = Typography;

function Movies(props: any) {


    const dispatch = useDispatch();
    const {list: movies} = useSelector((state: RootState) => state.movies);
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
                >
                    Refresh Movies
                </Button>
            </div>
            <div className="col-12">
                <div className="row align-items-start justify-content-start">
                    {
                        movies.status==='loading' &&
                        <div className="col-4">
                            <Card loading={movies.status=== 'loading'}></Card>
                        </div>
                    }
                    {
                        movies.status !=='loading' && movies.data && movies.data.map((movie) =>
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