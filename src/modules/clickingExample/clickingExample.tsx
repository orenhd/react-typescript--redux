import React, { PureComponent } from "react";
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { State } from '../../application/application.store' 
import { setUserName, updateClickingData } from './clickingExample.actions';

import * as dataModels from './clickingExample.dataModels';

import UserNameBar from './components/userNameBar';
import ClickingPanel from './components/clickingPanel';

interface ClickingExmapleProps {
    userName: string;
    clickingData: dataModels.ClickingData;
    setUserName: any;
    updateClickingData: any;
}

class ClickingExample extends PureComponent<ClickingExmapleProps, {}> {

    /* Class Methods */

    setUserName = (userName: string) => {
        this.props.setUserName(userName);
    }

    homeButtonClicked = () => {
        this.props.updateClickingData(dataModels.ClickCountTypes.homeButtonClick);
    }

    homeButtonClickedOutside = () => {
        this.props.updateClickingData(dataModels.ClickCountTypes.homeButtonClickOutside);
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
    return bindActionCreators({
        setUserName,
        updateClickingData
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ClickingExample);