import { createStore, applyMiddleware, combineReducers, Store, Action, compose } from 'redux';
import thunk from 'redux-thunk';

import { persistStore, persistReducer, BaseReducer, Persistor } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import * as clickingExample from '../modules/clickingExample/clickingExample.reducer';
import * as topTwentyAlbums from '../modules/topTwentyAlbums/topTwentyAlbums.reducer';

const persistConfig = {
    key: 'root',
    storage,
}

export interface State {
    clickingExample: clickingExample.state,
    topTwentyAlbums: topTwentyAlbums.state
}

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store:Store<State> = createStore(
    persistReducer(persistConfig, <BaseReducer<State, Action>> combineReducers({
        clickingExample: clickingExample.reducer,
        topTwentyAlbums: topTwentyAlbums.reducer
    })),
    composeEnhancers(applyMiddleware(thunk))
);

export const persistor: Persistor = persistStore(store)