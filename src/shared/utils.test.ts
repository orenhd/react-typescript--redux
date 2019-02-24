import { getMapFromArrayByPropertyKey, getSortedArrayFromMap } from "./utils";

/* Import Mocks */
import  iTunesGenreIdsCacheMock from '../modules/topTwentyAlbums/services/__mocks__/iTunesGenreIdsCache.mock.json';

describe('shared utils logic', () => {

    it('map and sort utils', () => {

        /* Map */

        const genresMap = getMapFromArrayByPropertyKey(iTunesGenreIdsCacheMock, 'id');

        const genresMapKeys = Object.keys(genresMap ? genresMap : {});
        expect(genresMapKeys.length).toBe(iTunesGenreIdsCacheMock.length);

        const firstIdKey = genresMapKeys[0];
        expect(genresMap && genresMap[firstIdKey].id === firstIdKey).toBeFalsy();
        expect(genresMap && genresMap[firstIdKey].id == firstIdKey).toBeTruthy();


        /* Sort */

        const sortedGenres = getSortedArrayFromMap(<Object> genresMap, 'title');

        expect(sortedGenres && sortedGenres.length).toBe(genresMapKeys.length);
        expect(sortedGenres && sortedGenres[0].title).toBe('Alternative');
    });


});