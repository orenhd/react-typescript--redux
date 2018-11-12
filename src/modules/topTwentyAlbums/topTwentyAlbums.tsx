import React, { PureComponent } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';

import { State } from '../../application/application.store' 
import { loadGenres, loadAlbumEntriesByGenreId } from './topTwentyAlbums.actions';
import { getSortedGenres, getCurrentGenre, getAlbumEntriesList } from './topTwentyAlbums.selectors';

import * as dataModels from './topTwentyAlbums.dataModels';
import * as viewModels from './topTwentyAlbums.viewModels';

import GenreSelectionBar from './components/genreSelectionBar';
import AlbumsList from './components/albumsList';

export interface TopTwentyAlbumsProps extends RouteComponentProps<{}> { // route params should be defined in the RouteComponentProps type
    genres: dataModels.ITunesGenre[];
    currentGenre: dataModels.ITunesGenre;
    albumEntriesList: viewModels.AlbumEntryListItem[];
    loadGenres: any;
    loadAlbumEntriesByGenreId: any;
    match: any;
    history: any;
}

class TopTwentyAlbums extends PureComponent<TopTwentyAlbumsProps, {}> {

    /* Lifecycle Methods */

    componentDidMount() {
        const genreId: number = parseInt(this.props.match.params.genreId, 10);
        this.props.loadGenres(genreId);
    }

    componentDidUpdate(prevProps: TopTwentyAlbumsProps) {
        /* if route param has changed - store the new viewedLocationId */
        if (this.props.match.params.genreId !== prevProps.match.params.genreId) {
            const genreId: number = parseInt(this.props.match.params.genreId, 10);
            this.props.loadAlbumEntriesByGenreId(genreId);
        }
    }

    /* Class Methods */

    navigateToSelectedGenreId = (genreId: number) => {
        this.props.history.push(`/top-twenty/${genreId}`);
    }

    render() {
        return <div className="top-twenty-albums">
            <GenreSelectionBar 
                genres={this.props.genres} 
                currentGenre={this.props.currentGenre}
                genreSelectedHandler={this.navigateToSelectedGenreId}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopTwentyAlbums));