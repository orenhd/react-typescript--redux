import { Action } from 'redux';

import { SET_GENRES, SET_ALBUM_ENTRIES, SET_CURRENT_GENRE_ID } from './topTwentyAlbums.actions';

import * as ITunesService from "./services/iTunes.service";

import * as dataModels from './topTwentyAlbums.dataModels';

import * as viewModels from './topTwentyAlbums.viewModels';

export interface state {
    genres: dataModels.ITunesGenre[];
    albumEntries: dataModels.ITunesAlbumEntry[];
    currentGenreId: number | null;
}

const initialState: state = {
    genres: [],
    albumEntries: [],
    currentGenreId: null
}

export function reducer(state: state = initialState, action: any) {
  switch (action.type) {
    case SET_GENRES:
      return { ...state, genres: action.genres };
    case SET_ALBUM_ENTRIES:
      return { ...state, albumEntries: action.albumEntries };
    case SET_CURRENT_GENRE_ID:
      return { ...state, currentGenreId: action.genreId };
    default:
      return state;
  }
}