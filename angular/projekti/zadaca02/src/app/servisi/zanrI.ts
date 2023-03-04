import {FilmI, TMDBFilmI} from "./filmI"

export interface ZanrI{
    id:number;
    naziv: string;
    opis: string;
    tmdb_id: number;
    pripadajuciFilm: Array<FilmI>
}