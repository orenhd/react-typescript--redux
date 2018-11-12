import { Action, ActionCreator, Dispatch } from 'redux';

import { State } from '../../application/application.store';

import * as ITunesService from "./services/iTunes.service";

import * as dataModels from './topTwentyAlbums.dataModels';
import * as viewModels from './topTwentyAlbums.viewModels';

import { getMapFromArrayByPropertyKey } from '../../shared/utils';

export const SET_GENRES: string = 'SET_GENRES';
export const setGenres:ActionCreator<Action> = (genresMap: dataModels.ITunesGenresMap) => {
    return {
        type: SET_GENRES,
        genresMap
    }
}

export const SET_ALBUM_ENTRIES: string = 'SET_ALBUM_ENTRIES';
export const setAlbumEntries:ActionCreator<Action> = (albumEntries: dataModels.ITunesAlbumEntry[]) => {
    return {
        type: SET_ALBUM_ENTRIES,
        albumEntries
    }
}

export const SET_CURRENT_GENRE_ID: string = 'SET_CURRENT_GENRE_ID';
export const setCurrentGenreId:ActionCreator<Action> = (genreId: number) => {
    return {
        type: SET_CURRENT_GENRE_ID,
        genreId
    }
}

export const loadGenres = (requestedGenreId: number) => (dispatch: Dispatch<State>, getState: () => State) => {
    const { topTwentyAlbums } = getState();

    ITunesService.getGenres().then((genres: dataModels.ITunesGenre[]) => {
        const genresMap: dataModels.ITunesGenresMap = <dataModels.ITunesGenresMap> getMapFromArrayByPropertyKey(genres, 'id');
        dispatch(setGenres(genresMap));

        const genreId: number = (requestedGenreId && genresMap[requestedGenreId] && genresMap[requestedGenreId].id) 
        || (genres[0] && genres[0].id);

        // loading genre ids is always followed by loading the selected genre albums list
        dispatch(loadAlbumEntriesByGenreId(genreId));
    })

}

export const loadAlbumEntriesByGenreId = (genreId: number) => (dispatch: Dispatch<State>, getState: () => State) => {
    ITunesService.getTopTwentyAlbumsByGenreId(genreId).then((albumEntries: dataModels.ITunesAlbumEntry[]) => {
        dispatch(setCurrentGenreId(genreId));
        dispatch(setAlbumEntries(albumEntries));
    });
}