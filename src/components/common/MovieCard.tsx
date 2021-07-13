import {IMovie} from "../../store/types/movieTypes";
import React, {FC} from "react";
import {Link} from "react-router-dom";
import InlineItem from "./InlineItem";
import {Button, Card, Popconfirm} from "antd";
import {deleteMovie, toggleFav} from "../../store/actions/movieActions";
import {useDispatch} from "react-redux";

export const MovieCard: FC<{ movie: IMovie; hideDetailButton?:boolean}> =
    ({movie,hideDetailButton, children}) => {
    const dispatch = useDispatch();
    return (
        <Card size="small"
              title={<span>{movie.title}</span>}
              extra={!hideDetailButton &&
                  <Link to={`/movies/${movie._id}`}>
                      Detail
                  </Link>
              }>
            <div style={{display: "flex", flexDirection: "column"}}>
                <InlineItem label={"Genre"}
                            val={movie.genre.name}/>
                <InlineItem label={"Publish date"}
                            val={movie.publishDate}/>
                <InlineItem label={"Daily rental"}
                            val={movie.dailyRentalRate}/>
                <InlineItem label={"Stock"}
                            val={movie.numberInStock}/>
                <div className="d-flex justify-content-between">
                    <Button
                        className="col-auto"
                        style={{marginTop: "10px"}}
                        type="primary"
                        onClick={() => dispatch(toggleFav(movie._id))}
                    >
                        {movie.isFavorite ? "Remove from fav" : 'Add to fav'}
                    </Button>
                    <Popconfirm title={"Delete Movie?"}
                                placement="bottom"
                                onConfirm={() => dispatch(deleteMovie(movie._id))}
                    >
                        <Button
                            className="col-auto"
                            style={{marginTop: "10px"}}
                            type="primary"
                            danger
                        >
                            Delete
                        </Button>
                    </Popconfirm>
                </div>
            </div>
        </Card>
    )
};

export default MovieCard;