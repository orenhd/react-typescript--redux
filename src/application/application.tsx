import * as React from "react";
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { State } from './application.store' 

import {FormattedMessage, FormattedDate} from 'react-intl';
import { $t } from '../i18n/i18n.service';

import { NavLink, Route, Switch, Redirect } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';

const styles = require('./application.scss');

/* module components */
import ClickingExample from "../modules/clickingExample/clickingExample";
import TopTwentyAlbums from "../modules/topTwentyAlbums/topTwentyAlbums";

interface ApplicationState { open: boolean }

class Application extends React.Component<any, ApplicationState> {

    constructor(props: any) {
        super(props);
        this.state = { open: false };
    }

/*
    componentWillMount() {
        let subscriptions: Subscription[] = [];

        subscriptions.push(clickingExampleService.userName$.subscribe((userName) => {
                this.setState({greeting: userName ? $t.formatMessage({ id: 'general.greeting' }, {userName}) : ''});
            })
        );
    }
*/

    /* Class Methods */

    handleToggle = () => this.setState({ open: !this.state.open});
    handleClose = () => this.setState({ open: false });

    render() {
        return <div className="application">
        <AppBar
            title={this.props.userName}
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onLeftIconButtonClick={this.handleToggle}
        />
        <Drawer 
            className={styles.appDrawer}
            docked={false} 
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
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
        <Route path="/top-twenty" component={TopTwentyAlbums}/>
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
        userName
    }
}

const mapDispatchToProps = (dispatch: Dispatch<State>) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Application);