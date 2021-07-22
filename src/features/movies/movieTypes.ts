export type IMovie = {
    _id: string,
    title: string,
    genre: { _id: string, name: string },
    numberInStock: number,
    dailyRentalRate: number,
    publishDate?: string,
    isFavorite: boolean
}

export type CreateMovie = {
    title: string;
    numberInStock: number;
    dailyRentalRate: number;
    genreId: string;
}

export type EditMovie = CreateMovie & {id:string}

//state
export interface MovieState {
    list: {
        data: {[key:string]:IMovie};
        status:'idle'|'loading'|'finished'|'error';
        error: string;
    },

}

