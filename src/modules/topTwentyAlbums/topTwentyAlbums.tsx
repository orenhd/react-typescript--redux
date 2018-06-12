import React, { PureComponent } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { State } from '../../application/application.store' 
import { loadGenreIds, loadAlbumEntriesByGenreId } from './topTwentyAlbums.actions';
import { getCurrentGenre, getAlbumEntriesList } from './topTwentyAlbums.selectors';

import * as dataModels from './topTwentyAlbums.dataModels';
import * as viewModels from './topTwentyAlbums.viewModels';

import GenreSelectionBar from './components/genreSelectionBar';
import AlbumsList from './components/albumsList';

export interface TopTwentyAlbumsProps {
    genres: dataModels.ITunesGenre[];
    currentGenre: dataModels.ITunesGenre;
    albumEntriesList: viewModels.AlbumEntryListItem[];
    loadGenreIds: any;
    loadAlbumEntriesByGenreId: any;
}

class TopTwentyAlbums extends PureComponent<TopTwentyAlbumsProps, {}> {

    /* Lifecycle Methods */

    componentDidMount() {
        this.props.loadGenreIds();
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
    const { topTwentyAlbums } = state;
    return {
        genres: topTwentyAlbums.genres,
        currentGenre: getCurrentGenre(state),
        albumEntriesList: getAlbumEntriesList(state)
    }
}

const mapDispatchToProps = (dispatch: Dispatch<State>) => {
    return bindActionCreators({
        loadGenreIds,
        loadAlbumEntriesByGenreId
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TopTwentyAlbums);