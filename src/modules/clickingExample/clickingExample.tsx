import * as React from "react";
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { State } from '../../application/application.store' 
import { setUserName, homeButtonClicked, homeButtonClickedOutside } from './clickingExample.actions';

import * as dataModels from './clickingExample.dataModels';

import UserNameBar from './components/userNameBar';
import ClickingPanel from './components/clickingPanel';

class ClickingExample extends React.Component<any, any> {

    /* Class Methods */

    setUserName = (userName: string) => {
        this.props.setUserName(userName);
    }

    homeButtonClicked = () => {
        this.props.homeButtonClicked();
    }

    homeButtonClickedOutside = () => {
        this.props.homeButtonClickedOutside();
    }

    render() {
        return <div className="clicking-example margined-content">
            <UserNameBar 
                userName={this.props.userName} 
                userNameChangedHandler={this.setUserName}
            />
            <ClickingPanel
                clickingData={this.props.clickingData}
                homeButtonClickedHandler={this.homeButtonClicked}
                homeButtonClickedOutsideHandler={this.homeButtonClickedOutside}
            />
        </div>
    }
}

const mapStateToProps = (state: State) => {
    const { clickingExample } = state;
    const { userName, clickingData } = clickingExample;
    return {
        userName,
        clickingData
    }
}

const mapDispatchToProps = (dispatch: Dispatch<State>) => {
    return {
        setUserName: (userName: string) => dispatch(setUserName(userName)),
        homeButtonClicked: () => dispatch(homeButtonClicked()),
        homeButtonClickedOutside: () => dispatch(homeButtonClickedOutside())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClickingExample);