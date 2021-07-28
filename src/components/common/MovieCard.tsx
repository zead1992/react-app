import React, {FC} from "react";
import {Link} from "react-router-dom";
import InlineItem from "./InlineItem";
import {Button, Card, Popconfirm} from "antd";
import {useDispatch} from "react-redux";
import moment from "moment";
import {deleteMovie, toggleMovieFav} from "../../features/movies/moviesSlice";
import {IMovie} from "../../features/movies/movieTypes";
import styled from "styled-components";
import {useTranslation} from "react-i18next";

const Wrapper = styled(Card)`
  .extra-wrapper{
    a{
      margin: 0 10px;
    }
  }
`;

export const MovieCard: FC<{ movie: IMovie; hideDetailButton?: boolean }> =
    ({movie, hideDetailButton, children}) => {
        const dispatch = useDispatch();
        const {t,i18n} = useTranslation(['web','common']);
        return (
                <Wrapper size="small"
                      title={<span>{movie.title}</span>}
                      extra={
                      <div className="extra-wrapper">
                          {!hideDetailButton &&
                          <Link to={`/${i18n.language}/movies/${movie._id}`}>
                              {t('common:detail')}
                          </Link>
                          }
                          <Link to={`/${i18n.language}/movies/edit/${movie._id}`}>
                              {t('common:edit')}
                          </Link>
                      </div>
                      }>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <InlineItem label={t('web:genres.genre')}
                                    val={movie.genre.name}/>
                        <InlineItem label={t('common:publishDate')}
                                    val={moment(movie.publishDate).format('DD/MM/YYYY')}/>
                        <InlineItem label={t('common:dailyRental')}
                                    val={movie.dailyRentalRate}/>
                        <InlineItem label={t('common:stock')}
                                    val={movie.numberInStock}/>
                        <div className="d-flex justify-content-between">
                            <Button
                                className="col-auto"
                                style={{marginTop: "10px"}}
                                type="primary"
                                onClick={() => dispatch(toggleMovieFav({movieId: movie._id}))}
                            >
                                {movie.isFavorite ? t('common:removeFav') : t('common:addFav')}
                            </Button>
                            <Popconfirm title={t('common:deleteItem')}
                                        placement="bottom"
                                        okText={t('common:ok')}
                                        cancelText={t('common:cancel')}
                                        onConfirm={() => dispatch(deleteMovie({movieId: movie._id}))}
                            >
                                <Button
                                    className="col-auto"
                                    style={{marginTop: "10px"}}
                                    type="primary"
                                    danger
                                >
                                    {t('common:delete')}
                                </Button>
                            </Popconfirm>
                        </div>
                    </div>
                </Wrapper>
        )
    };

export default MovieCard;