import React, { SFC } from "react";

import PropTypes from "prop-types";

import { $t } from '../../../i18n/i18n.service'

import TextField from 'material-ui/TextField';

import * as dataModels from '../clickingExample.dataModels';

interface UserNameBarProps {
    userName: string | null;
    userNameChangedHandler: (userName: string) => void;
}

const UserNameBar: SFC<UserNameBarProps> = (props: UserNameBarProps) =>
<TextField
    defaultValue={props.userName ? props.userName : ''}
    floatingLabelText={$t.formatMessage({id: 'clickingExample.userName'})}
    onChange={(e: React.FocusEvent<{}>, newValue: any) => {props.userNameChangedHandler(newValue)}}
/>

/* We can still use propTypes for dynamic type-checking ;) */
UserNameBar.propTypes = {
    userName: PropTypes.string,
    userNameChangedHandler: PropTypes.func.isRequired
}

export default UserNameBar;