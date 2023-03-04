export interface FilmI{
    id: number;
    jezik: string;
    izvorni_naslov: string;
    naslov: string;
    datum_objave: string;
    datum_unosa: string;
    opis: string;
    popularnost: number;
    vrijeme_trajanja: number;
    video: string;
    poster_url: string;
}

export interface TMDBFilmI{
    id: number;
    original_language: string;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    date: string;
}