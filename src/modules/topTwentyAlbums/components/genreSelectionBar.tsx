import * as React from "react";

import PropTypes from "prop-types";

import { $t } from '../../../i18n/i18n.service'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import * as dataModels from '../topTwentyAlbums.dataModels';

interface GenreSelectionBarProps {
    genres: dataModels.ITunesGenre[];
    currentGenre: dataModels.ITunesGenre | null;
    genreSelectedHandler: (genreId: number) => void;
}

const GenreSelectionBar: React.SFC<GenreSelectionBarProps> = (props: GenreSelectionBarProps) =>
<SelectField className="margined-content"
    floatingLabelText={$t.formatMessage({id: 'topTwentyAlbums.genre'})}
    value={props.currentGenre ? props.currentGenre.id : null}
    onChange={(e: React.SyntheticEvent<{}>, index: number, menuItemValue: any) => { props.genreSelectedHandler(menuItemValue) }}
>
    {props.genres.map(genre => <MenuItem value={genre.id} primaryText={genre.title} key={genre.id} />)}
</SelectField>

/* We can still use propTypes for dynamic type-checking ;) */
GenreSelectionBar.propTypes = {
    genres: PropTypes.arrayOf(PropTypes.shape({
        'title': PropTypes.string.isRequired,
        'id': PropTypes.number.isRequired
    })).isRequired,
    currentGenre: PropTypes.shape({
        'title': PropTypes.string.isRequired,
        'id': PropTypes.number.isRequired
    }),
    genreSelectedHandler: PropTypes.func.isRequired
}

export default GenreSelectionBar;