import { createSelector, Selector } from 'reselect';

import { State } from '../../application/application.store';

import * as dataModels from './topTwentyAlbums.dataModels';

import * as viewModels from './topTwentyAlbums.viewModels';

import * as utils from './topTwentyAlbums.utils';

export const genresSelector: Selector<State, dataModels.ITunesGenre[]> = (state: State) => state.topTwentyAlbums.genres;

export const currentGenreIdSelector: Selector<State, number | null> = (state: State) => state.topTwentyAlbums.currentGenreId;

export const albumEntriesSelector: Selector<State, dataModels.ITunesAlbumEntry[]> = (state: State) => state.topTwentyAlbums.albumEntries;

export const getCurrentGenre: Selector<State, dataModels.ITunesGenre | undefined> = createSelector(
    genresSelector,
    currentGenreIdSelector,
    (genres: dataModels.ITunesGenre[], genreId: number | null) => {
        let matchingGenres = genres.filter((genre) => genre.id === genreId);
        return matchingGenres[0];
    }
)

export const getAlbumEntriesList: Selector<State, viewModels.AlbumEntryListItem[]> = createSelector(
    albumEntriesSelector,
    (albumEntries: dataModels.ITunesAlbumEntry[]) => utils.mapToListAlbumEntries(albumEntries)
)