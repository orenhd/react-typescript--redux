import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { State } from './application.store';

import { FormattedMessage } from 'react-intl';
import { $t } from '../i18n/i18n.service';

import { NavLink, Route, Redirect, RouteComponentProps } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';

const styles = require('./application.scss'); // use require to bypass typescript import, which requires typings 

import { getCurrentGenre } from '../modules/topTwentyAlbums/topTwentyAlbums.selectors';
import * as topTwentyDataModels from '../modules/topTwentyAlbums/topTwentyAlbums.dataModels';

/* module components */
import ClickingExample from "../modules/clickingExample/clickingExample";
import TopTwentyAlbums from "../modules/topTwentyAlbums/topTwentyAlbums";

interface ApplicationProps extends RouteComponentProps<{}> { // route params should be defined in the RouteComponentProps type
    userName: string;
    currentGenre: topTwentyDataModels.ITunesGenre;
};

interface ApplicationState { open: boolean }

class Application extends Component<ApplicationProps, ApplicationState> {

    constructor(props: ApplicationProps) {
        super(props);
        this.state = { open: false };
    }

    /* Class Methods */

    handleToggle = () => this.setState((prevState) => { return { open: !prevState.open}; });
    handleDrawerRequestChange = (open: boolean) => this.setState({open})
    handleClose = () => this.setState({ open: false });

    render() {
        const { userName, currentGenre } = this.props;

        return <div className="application">
        <AppBar
            title={userName ? $t.formatMessage({ id: 'general.greeting' }, {userName}) : ''}
            iconElementRight={currentGenre ? <Chip>{currentGenre.title}</Chip> : undefined}
            onLeftIconButtonClick={this.handleToggle}
        />
        <Drawer 
            className={styles.appDrawer}
            docked={false} 
            open={this.state.open}
            onRequestChange={this.handleDrawerRequestChange}
        >
          <MenuItem className={styles.menuItemTitle}>
                <FormattedMessage id="general.navigation" />
          </MenuItem>
          <NavLink activeClassName={styles.navLinkActive} to="/clicking-example">
            <MenuItem 
                leftIcon={<FontIcon className="material-icons">mouse</FontIcon>} 
                onClick={this.handleClose}
                >
                    <FormattedMessage id="clickingExample.clickingExample" />
            </MenuItem>
          </NavLink>
          <NavLink activeClassName={styles.navLinkActive} to="/top-twenty">
            <MenuItem 
                leftIcon={<FontIcon className="material-icons">album</FontIcon>} 
                onClick={this.handleClose}
                >
                    <FormattedMessage id="topTwentyAlbums.topTwentyAlbums" />
            </MenuItem>
          </NavLink>
        </Drawer>
        <Route path="/clicking-example" component={ClickingExample}/>
        <Route exact path="/top-twenty" component={TopTwentyAlbums}/>
        <Route exact path="/top-twenty/:genreId" component={TopTwentyAlbums}/>
        <Route exact path="/" render={() => (
            <Redirect to="/top-twenty"/>
        )}/>
        </div>;
    }
}

const mapStateToProps = (state: State) => {
    const { clickingExample } = state;
    const { userName } = clickingExample;
    return {
        userName,
        currentGenre: getCurrentGenre(state),
    }
}

export default withRouter(connect(mapStateToProps, {})(Application));