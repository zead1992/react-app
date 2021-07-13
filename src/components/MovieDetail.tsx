import React, {FC, useEffect} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/reducers/rootReducer";
import {fetchMovieDetailAsync} from "../store/reducers/movieReducer";
import MovieCard from "./common/MovieCard";
import {Spin} from "antd";

type IProps = RouteComponentProps<{ id: string }>;

export const MovieDetail: FC<IProps> = (props: IProps) => {

    const dispatch = useDispatch();
    const {data: movie} = useSelector((state: RootState) => state.movies.detail);
    const {movieDetail: loading} = useSelector((state: RootState) => state.loading);


    useEffect(() => {
        dispatch(fetchMovieDetailAsync(props.match.params.id));
    }, []);

    return (
        <div>
            {
                loading && <div><Spin/></div>
            }
            {
                movie && <div className="row align-items-start justify-content-start my-3">
                    <div className="col-4">
                        <MovieCard movie={movie} hideDetailButton={true}/>
                    </div>
                </div>
            }
        </div>
    );
}

export default MovieDetail;