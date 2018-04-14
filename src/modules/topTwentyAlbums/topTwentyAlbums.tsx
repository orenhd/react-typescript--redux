import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { State } from '../../application/application.store' 
import { loadGenreIds, loadAlbumEntriesByGenreId } from './topTwentyAlbums.actions';
import { getCurrentGenre, getAlbumEntriesList } from './topTwentyAlbums.selectors';

import * as dataModels from './topTwentyAlbums.dataModels';
import * as viewModels from './topTwentyAlbums.viewModels';

import GenreSelectionBar from './components/genreSelectionBar';
import AlbumsList from './components/albumsList';

class TopTwentyAlbums extends React.Component<any, any> {

    /* Lifecycle Methods */

    componentWillMount() {
        this.props.loadGenreIds();
    }

    /* Class Methods */

    loadAlbumEntriesByGenreId = (genreId: number) => {
        this.props.loadAlbumEntriesByGenreId(genreId);
    }

    render() {
        return <div className="top-twenty-albums">
            <GenreSelectionBar 
                genres={this.props.genres} 
                currentGenre={this.props.currentGenre}
                genreSelectedHandler={this.loadAlbumEntriesByGenreId}
            />
            {this.props.albumEntriesList && <AlbumsList
                albumEntriesList={this.props.albumEntriesList}
            />}
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
    return {
        loadGenreIds: () => dispatch(loadGenreIds()),
        loadAlbumEntriesByGenreId: (genreId: number) => dispatch(loadAlbumEntriesByGenreId(genreId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopTwentyAlbums);