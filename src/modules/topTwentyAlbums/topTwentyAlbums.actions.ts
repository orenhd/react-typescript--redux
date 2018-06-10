import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { State } from '../../application/application.store';

import * as ITunesService from "./services/iTunes.service";

import * as dataModels from './topTwentyAlbums.dataModels';

import * as viewModels from './topTwentyAlbums.viewModels';

export const SET_GENRES: string = 'SET_GENRES';
export const setGenres:ActionCreator<Action> = (genres: dataModels.ITunesGenre[]) => {
    return {
        type: SET_GENRES,
        genres
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

export const loadGenreIds = () => (dispatch: Dispatch<State>, getState: () => State) => {
    const { topTwentyAlbums } = getState();

    if (!topTwentyAlbums.currentGenreId)
        ITunesService.getGenres().then((genres: dataModels.ITunesGenre[]) => {
            dispatch(setGenres(genres));
            if (genres && genres[0] && !topTwentyAlbums.currentGenreId) {
                //loading genre ids is always followed by loading the selected genre albums list
                dispatch(loadAlbumEntriesByGenreId(genres[0].id));
            }
        })

}

export const loadAlbumEntriesByGenreId = (genreId: number) => (dispatch: Dispatch<State>, getState: () => State) => {
    ITunesService.getTopTwentyAlbumsByGenreId(genreId).then((albumEntries: dataModels.ITunesAlbumEntry[]) => {
        dispatch(setCurrentGenreId(genreId));
        dispatch(setAlbumEntries(albumEntries));
    });
}