import {v4 as uuidv4} from "uuid";
import moment from "moment";
import {MovieState} from "./features/movies/movieTypes";
import {RootState} from "./store/store";
import {IGenre} from "./features/genres/genreTypes";

const mockGenre: IGenre[] = [];
for (let i = 1; i < 5; i++) {
    mockGenre.push({
        _id: uuidv4(),
        name: `genre ${i}`
    })
}

const movieState: MovieState = {
    list: {
        data: {},
        status: 'idle',
        error: null
    }
}
mockGenre.forEach((g, index) => {
    const id = uuidv4();
    movieState.list.data[id] = {
        _id: id,
        genre: g,
        title: `Movie ${index}`,
        isFavorite: false,
        publishDate: moment().subtract(index + 1, 'days').format('DD/MM/YYYY'),
        dailyRentalRate: 10 + 5,
        numberInStock: index + 2
    }
})

export const getMockRootState = (): RootState => {
    return {
        movies: movieState,
        genre:{list: mockGenre},
        loading:{
            newMovie:false,
            movieDetail:false,
            genreList:false,
            movieList:false
        }
    }
}
