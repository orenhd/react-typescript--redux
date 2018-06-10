import React, { SFC } from "react";

import PropTypes from "prop-types";

import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import * as viewModels from '../topTwentyAlbums.viewModels';

interface AlbumsListProps {
    albumEntriesList: viewModels.AlbumEntryListItem[];
}

const AlbumsList: SFC<AlbumsListProps> = (props: AlbumsListProps) =>
<List>
    {props.albumEntriesList.map(albumEntry => 
        <ListItem
        key={albumEntry.id}
        leftAvatar={<Avatar src={albumEntry.thumbnail} />}
        primaryText={albumEntry.title}
        secondaryText={
            <p>
            <span>{albumEntry.artist}</span>
                <br />
            <span>{albumEntry.copyright}</span>
            </p>
        }
        secondaryTextLines={2}
        style={{pointerEvents: 'none'}}
        />
    )}
</List>

/* We can still use propTypes for dynamic type-checking ;) */
const albumEntryShape = PropTypes.shape({
    'id': PropTypes.string.isRequired,
    'title': PropTypes.string.isRequired,
    'artist': PropTypes.string.isRequired,
    'copyright': PropTypes.string.isRequired,
    'thumbnail': PropTypes.string.isRequired
});

AlbumsList.propTypes = {
    albumEntriesList: PropTypes.arrayOf(albumEntryShape)
}

export default AlbumsList;