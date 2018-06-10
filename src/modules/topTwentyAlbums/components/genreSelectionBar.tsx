import React, { SFC } from "react";

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

const GenreSelectionBar: SFC<GenreSelectionBarProps> = (props: GenreSelectionBarProps) =>
<SelectField className="margined-content"
    floatingLabelText={$t.formatMessage({id: 'topTwentyAlbums.genre'})}
    value={props.currentGenre ? props.currentGenre.id : null}
    onChange={(e: React.SyntheticEvent<{}>, index: number, menuItemValue: any) => { props.genreSelectedHandler(menuItemValue) }}
>
    {props.genres.map(genre => <MenuItem value={genre.id} primaryText={genre.title} key={genre.id} />)}
</SelectField>

/* We can still use propTypes for dynamic type-checking ;) */
const genreShape = PropTypes.shape({
    'title': PropTypes.string.isRequired,
    'id': PropTypes.number.isRequired
});

GenreSelectionBar.propTypes = {
    genres: PropTypes.arrayOf(genreShape).isRequired,
    currentGenre: genreShape,
    genreSelectedHandler: PropTypes.func.isRequired
}

export default GenreSelectionBar;