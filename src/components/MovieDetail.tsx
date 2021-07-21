import React, {FC, useEffect} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {fetchMovieDetailAsync} from "../store/reducers/movieReducer";
import MovieCard from "./common/MovieCard";
import {Spin} from "antd";
import {RootState} from "../store/store";

type IProps = RouteComponentProps<{ id: string }>;

export const MovieDetail: FC<IProps> = (props: IProps) => {


    const dispatch = useDispatch();
    const movie = useSelector((state: RootState) =>
        state.movies.list.data.find(m=>m._id == props.match.params.id));


    useEffect(() => {
    }, []);


    return (
        <div>
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