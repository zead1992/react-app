import React, {useEffect} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/reducers/rootReducer";
import {fetchMovieDetailAsync} from "../store/reducers/movieReducer";

type IProps = RouteComponentProps<{ id: string }>;

function MovieDetail(props: IProps) {

    const dispatch = useDispatch();
    const {data:movie} = useSelector((state : RootState) => state.movies.detail)

    useEffect(() => {
        dispatch(fetchMovieDetailAsync(props.match.params.id));
    }, []);

    return (
        <div>
            Movie Detail : {props.match.params.id}
            <ul className="list-group">
                <li className="list-group-item">title: {movie?.title}</li>
                <li className="list-group-item">genre: {movie?.genre.name}</li>
            </ul>
        </div>
    );
}

export default MovieDetail;