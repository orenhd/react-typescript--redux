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

export interface TopTwentyAlbumsProps {
    genres: dataModels.ITunesGenre[];
    currentGenre: dataModels.ITunesGenre;
    albumEntriesList: viewModels.AlbumEntryListItem[];
    loadGenres: (requestedGenreId: number) => any;
    loadAlbumEntriesByGenreId: (genreId: number) => any;
}

type IProps = TopTwentyAlbumsProps & RouteComponentProps<{
    genreId: string,
}>

export class TopTwentyAlbums extends PureComponent<IProps, {}> { // export base class for testing purposes

    /* Lifecycle Methods */

    componentDidMount() {
        const genreId: number = parseInt(this.props.match.params.genreId, 10);
        this.props.loadGenres(genreId);
    }

    componentDidUpdate(prevProps: IProps) {
        /* if route param has changed - store the new viewedLocationId */
        if (this.props.match.params.genreId !== prevProps.match.params.genreId) {
            const genreId: number = parseInt(this.props.match.params.genreId, 10);
            this.props.loadAlbumEntriesByGenreId(genreId);
        }
    }

    /* Class Methods */

    navigateToSelectedGenreId = (genreId: number) => {
        const { currentGenre } = this.props;

        if (!currentGenre || currentGenre.id !== genreId) {
            this.props.history.push(`/top-twenty/${genreId}`);
        }
    }

    render() {
        const { genres, currentGenre, albumEntriesList } = this.props;
        return <div className="top-twenty-albums">
            <GenreSelectionBar 
                genres={genres} 
                currentGenre={currentGenre}
                genreSelectedHandler={this.navigateToSelectedGenreId}
            />
            <AlbumsList
                albumEntriesList={albumEntriesList}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopTwentyAlbums));