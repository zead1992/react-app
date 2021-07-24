export type IGenre = {
    _id: string;
    name: string;
}

export interface GenreState {
    list: IGenre[];
}
