import { AnyAction } from 'redux';
import { SET_GENRES, SET_ALBUM_ENTRIES, SET_CURRENT_GENRE_ID } from './topTwentyAlbums.actions';

import * as dataModels from './topTwentyAlbums.dataModels';

export interface state {
    genresMap: dataModels.ITunesGenresMap;
    albumEntries: dataModels.ITunesAlbumEntry[];
    currentGenreId: number | null;
}

const initialState: state = {
    genresMap: {},
    albumEntries: [],
    currentGenreId: null
}

export function reducer(state: state = initialState, action: AnyAction) {
  switch (action.type) {
    case SET_GENRES:
      return { ...state, genresMap: action.genresMap };
    case SET_ALBUM_ENTRIES:
      return { ...state, albumEntries: action.albumEntries };
    case SET_CURRENT_GENRE_ID:
      return { ...state, currentGenreId: action.genreId };
    default:
      return state;
  }
}