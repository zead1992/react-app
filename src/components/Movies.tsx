import React, {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Card} from "antd";
import MovieCard from "./common/MovieCard";
import {fetchMoviesAsync, selectAllMovies,} from "../features/movies/moviesSlice";
import {useTranslation} from "react-i18next";
import MoviesFilter from "./common/MoviesFilter";
import {useLocation} from "react-router-dom";
import {useQuery} from "../hooks/custom-hooks";
import {MoviesFilterType} from "../types/common-types";
import {IMovie} from "../features/movies/movieTypes";
import {filterMovies} from "../services/movieService";


const Movies: FC = (props: any) => {

    const {i18n, t} = useTranslation(['web', 'common']);
    const location = useLocation();
    const query = useQuery();

    const dispatch = useDispatch();
    const {list:moviesState} = useSelector(selectAllMovies);
    const [filtered,setFiltered] = useState<{[key:string] : IMovie}>({});

    const refreshMovies =async ()=>{
        const searchQuery : MoviesFilterType = JSON.parse(query.get("searchQuery"));
        const list = await filterMovies(searchQuery);
        setFiltered(list);
    }

    useEffect(()=>{
        const init = async ()=>{
            await dispatch(fetchMoviesAsync());
            const searchQuery : MoviesFilterType = JSON.parse(query.get("searchQuery"));
            const list = await filterMovies(searchQuery);
            setFiltered(list);
        }
        init()
    },[location.search])

    useEffect(() => {
        const init = async ()=>{
            const searchQuery : MoviesFilterType = JSON.parse(query.get("searchQuery"));
            const list = await filterMovies(searchQuery);
            setFiltered(list);
        }
        init();
    }, [moviesState.data]);

    return (
        <div className="row my-3">
            <div className="col-12 mb-3">
                <Button disabled={moviesState.status === 'loading'}
                        type="primary"
                        onClick={refreshMovies}
                >{t('common:refresh')}</Button>
            </div>
            <MoviesFilter/>
            <div className="col-12">
                <div className="row align-items-start justify-content-start">
                    {
                        moviesState.status === 'loading' &&
                        <div className="col-4">
                            <Card loading={moviesState.status === 'loading'}></Card>
                        </div>
                    }
                    {
                        moviesState.status !== 'loading' && filtered && Object.values(filtered).map((movie) =>
                            <div className="col-4 mb-3"
                                 key={movie._id}>
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