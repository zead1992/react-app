import React, {useEffect, useState} from 'react';
import {fetchMoviesAsync} from "../store/reducers/movieReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/reducers/rootReducer";
import {Link} from 'react-router-dom';
import {Card, Spin,Button} from "antd";
import {} from "@ant-design/icons"

function Movies(props: any) {

    const dispatch = useDispatch();
    const {list: movies} = useSelector((state: RootState) => state.movies);
    const [refreshMovie, setRefreshMovie] = useState(false);

    useEffect(() => {
        dispatch(fetchMoviesAsync());
    }, [refreshMovie]);

    return (
        <div className="row my-3">
            <div className="col-12">
                <Button disabled={movies.loading}
                        type="primary"
                        onClick={() => setRefreshMovie(!refreshMovie)}
                >
                    Refresh Movies
                </Button>
            </div>
            <div className="col-12">
                <div className="row align-items-center justify-content-center">
                    {
                        movies.loading &&
                        <div className="col-auto">
                            <Spin/>
                        </div>
                    }
                    {
                        <div className="row align-items-start justify-content-start">
                            {
                                movies.data && movies.data.map((movie) =>
                                    <div className="col-4">
                                        <Card size="small"
                                              title={<span>{movie.title}</span>}
                                              extra={
                                                  <Link to={`/movies/${movie._id}`}>
                                                      Detail
                                                  </Link>
                                              }>
                                            <p>Card content</p>
                                            <p>Card content</p>
                                            <p>Card content</p>
                                        </Card>
                                    </div>
                                )
                            }
                        </div>
                    }
                </div>
            </div>
        </div>

    );
}

export default Movies;