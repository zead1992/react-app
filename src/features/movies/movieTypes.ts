import {CommonOption} from "../../types/common-types";

export type IMovie = {
    _id: string,
    title: string,
    genre: { _id: string, name: string },
    numberInStock: number,
    dailyRentalRate: number,
    publishDate?: string,
    isFavorite: boolean,
    rating:CommonOption;
    quality:CommonOption;
    lang:CommonOption
}

export type CreateMovie = {
    title: string;
    numberInStock: number;
    dailyRentalRate: number;
    genreId: string;
    isFavorite:boolean;
    rating:string;
    quality:string;
    lang:string;
}

export type EditMovie = CreateMovie & {id:string}

//state
export interface MovieState {
    list: {
        data: {[key:string]:IMovie};
        status:'idle'|'loading'|'finished'|'error';
        error: string;
    }

}

