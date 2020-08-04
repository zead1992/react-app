import React, {useEffect, useState} from 'react';
import {fetchMoviesAsync} from "../store/reducers/movieReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/reducers/rootReducer";
import { Link } from 'react-router-dom';

function Movies(props : any) {

    const dispatch = useDispatch();
    const {list:movies} = useSelector((state : RootState) => state.movies);
    const [refreshMovie,setRefreshMovie] = useState(false);

    useEffect(() => {
        dispatch(fetchMoviesAsync());
    }, [refreshMovie]);

    return (
        <div className="row">
            <div className="col-12">
                <button
                    disabled={movies.loading}
                    className="btn btn-primary"
                    onClick={()=> setRefreshMovie(!refreshMovie)}
                >refresh movie</button>
                <ul className="list-group">
                    {movies.loading &&
                    <p>loading movie</p>}
                    {!movies.loading && movies.data.map((m,index) =>
                        <Link to={`movies/${m._id}`} key={index} className="list-group-item">
                            {m.title}
                        </Link>
                    )}
                </ul>
            </div>
        </div>

    );
}

export default Movies;