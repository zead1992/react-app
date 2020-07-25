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