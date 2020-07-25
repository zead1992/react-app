import http from './http-service';
import {AxiosError} from "axios";
import {toast} from "react-toastify";
import {CreateMovie, IMovie} from "../store/types/movieTypes";

export async function getMovies() {
    return await http.get<IMovie[]>(`/movies`);
}

export async function getMovie(id: string) {
    return await http.get<IMovie>(`/movies/${id}`);
}

export async function addMovie(movieModel: CreateMovie) {
    try {
        const result = await http.post<IMovie>(`/movies`, movieModel);
        return result.data;
    } catch (e) {
        const error = e as AxiosError;
        if (error.response && error.response.status === 400) {
            toast.error("invalid movie info");
        }

        return Promise.reject(error);
    }
}

export async function updateMovie(movie: IMovie) {
    try {
        const model: CreateMovie = {
            title: movie.title,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate,
            genreId: movie.genre._id
        }
        const result = await http.put<IMovie>(`/movies/${movie._id}`, model);
        return result.data;
    } catch (e) {
        const error = e as AxiosError;
        if (error.response && error.response.status === 404) {
            toast.error("movie with given id do not exist");
        }
        return Promise.reject(error);
    }
}

export async function deleteMovie(id: string) {
    try {
        const result = await http.delete<IMovie>(`/movies/${id}`);
        return result.data;
    } catch (e) {
        const error = e as AxiosError;
        if (error.response && error.response.status === 404) {
            toast('Movie already deleted');
        }
        return Promise.reject(error);
    }

}