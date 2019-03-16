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

export class ClickingExample extends PureComponent<ClickingExmapleProps, {}> { // export base class for testing purposes

    /* Class Methods */

    homeButtonClicked = () => {
        this.props.updateClickingData(dataModels.ClickCountTypes.homeButtonClick);
    }

    homeButtonClickedOutside = () => {
        this.props.updateClickingData(dataModels.ClickCountTypes.homeButtonClickOutside);
    }

    render() {
        const { userName, setUserName, clickingData } = this.props;

        return <div className="clicking-example margined-content">
            <UserNameBar 
                userName={userName} 
                userNameChangedHandler={setUserName}
            />
            <ClickingPanel
                clickingData={clickingData}
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