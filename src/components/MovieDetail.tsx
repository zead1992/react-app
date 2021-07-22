import React, {FC, useEffect} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import MovieCard from "./common/MovieCard";
import {RootState} from "../store/store";
import {selectMovieById} from "../features/movies/moviesSlice";

type IProps = RouteComponentProps<{ id: string }>;

export const MovieDetail: FC<IProps> = (props: IProps) => {


    const movie = useSelector((state: RootState) => selectMovieById(state,props.match.params.id));


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