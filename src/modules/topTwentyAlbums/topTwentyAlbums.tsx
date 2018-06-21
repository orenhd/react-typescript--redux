import React, { PureComponent } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { State } from '../../application/application.store' 
import { loadGenres, loadAlbumEntriesByGenreId } from './topTwentyAlbums.actions';
import { getSortedGenres, getCurrentGenre, getAlbumEntriesList } from './topTwentyAlbums.selectors';

import * as dataModels from './topTwentyAlbums.dataModels';
import * as viewModels from './topTwentyAlbums.viewModels';

import GenreSelectionBar from './components/genreSelectionBar';
import AlbumsList from './components/albumsList';

export interface TopTwentyAlbumsProps {
    genres: dataModels.ITunesGenre[];
    currentGenre: dataModels.ITunesGenre;
    albumEntriesList: viewModels.AlbumEntryListItem[];
    loadGenres: any;
    loadAlbumEntriesByGenreId: any;
}

class TopTwentyAlbums extends PureComponent<TopTwentyAlbumsProps, {}> {

    /* Lifecycle Methods */

    componentDidMount() {
        this.props.loadGenres();
    }

    /* Class Methods */

    render() {

        const { loadAlbumEntriesByGenreId } = this.props;

        return <div className="top-twenty-albums">
            <GenreSelectionBar 
                genres={this.props.genres} 
                currentGenre={this.props.currentGenre}
                genreSelectedHandler={loadAlbumEntriesByGenreId}
            />
            <AlbumsList
                albumEntriesList={this.props.albumEntriesList}
            />
        </div>
    }
}

const mapStateToProps = (state: State) => {
    return {
        genres: getSortedGenres(state),
        currentGenre: getCurrentGenre(state),
        albumEntriesList: getAlbumEntriesList(state)
    }
}

const mapDispatchToProps = (dispatch: Dispatch<State>) => {
    return bindActionCreators({
        loadGenres,
        loadAlbumEntriesByGenreId
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TopTwentyAlbums);