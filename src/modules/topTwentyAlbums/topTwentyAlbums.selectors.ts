import { createSelector, Selector } from 'reselect';

import { State } from '../../application/application.store';

import * as dataModels from './topTwentyAlbums.dataModels';

import * as viewModels from './topTwentyAlbums.viewModels';

import * as utils from './topTwentyAlbums.utils';

import { getSortedArrayFromMap } from '../../shared/utils';

export const genresMapSelector: Selector<State, dataModels.ITunesGenresMap> = (state: State) => state.topTwentyAlbums.genresMap;

export const currentGenreIdSelector: Selector<State, number | null> = (state: State) => state.topTwentyAlbums.currentGenreId;

export const albumEntriesSelector: Selector<State, dataModels.ITunesAlbumEntry[]> = (state: State) => state.topTwentyAlbums.albumEntries;

export const getSortedGenres: Selector<State, dataModels.ITunesGenre[] | undefined> = createSelector(
    genresMapSelector,
    (genresMap: dataModels.ITunesGenresMap) => {
        if (!genresMap) return;

        return getSortedArrayFromMap(genresMap, 'title');
    }
)

export const getCurrentGenre: Selector<State, dataModels.ITunesGenre | undefined> = createSelector(
    genresMapSelector,
    currentGenreIdSelector,
    (genresMap: dataModels.ITunesGenresMap, genreId: number | null) => {
        if (!genreId) return;

        return genresMap[genreId];
    }
)

export const getAlbumEntriesList: Selector<State, viewModels.AlbumEntryListItem[]> = createSelector(
    albumEntriesSelector,
    (albumEntries: dataModels.ITunesAlbumEntry[]) => utils.mapToListAlbumEntries(albumEntries)
)