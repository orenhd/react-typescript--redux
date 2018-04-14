import { createStore, applyMiddleware, combineReducers, Store } from 'redux';
import thunk from 'redux-thunk';

import * as clickingExample from '../modules/clickingExample/clickingExample.reducer';
import * as topTwentyAlbums from '../modules/topTwentyAlbums/topTwentyAlbums.reducer';

export interface State {
    clickingExample: clickingExample.state,
    topTwentyAlbums: topTwentyAlbums.state
}

export const store:Store<State> = createStore(
    combineReducers({
        clickingExample: clickingExample.reducer,
        topTwentyAlbums: topTwentyAlbums.reducer
    }),
    applyMiddleware(thunk)
);