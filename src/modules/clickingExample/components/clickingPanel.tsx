import React, { PureComponent } from "react";

import { $t } from '../../../i18n/i18n.service'

import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';

const styles = require('./clickingPanel.scss');

import * as dataModels from '../clickingExample.dataModels';

import { getDocumentClickHandler } from '../../../shared/addons/clickOutside.addon';

interface ClickingPanelProps { 
    clickingData: dataModels.ClickingData;
    homeButtonClickedHandler: () => void;
    homeButtonClickedOutsideHandler: () => void;
}

class ClickingPanel extends PureComponent<ClickingPanelProps, {}> {

    /* Private Class Properties */

    private homeButtonWrapperRef: HTMLDivElement | null;

    /* Lifecycle Methods */

    componentDidMount() {
        this.boundDocumentClickHandler = getDocumentClickHandler(this.homeButtonWrapperRef, this.props.homeButtonClickedOutsideHandler);
        document.addEventListener('click', this.boundDocumentClickHandler);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.boundDocumentClickHandler);
    }

    /* Class Methods */

    boundDocumentClickHandler(event: MouseEvent) {}

    render() {
        return <div className="clicking-panel">
            <div className={`${styles.homeButtonWrapper} margined-content`} ref={(homeButtonWrapper) => {this.homeButtonWrapperRef = homeButtonWrapper}}>
                <FloatingActionButton mini={true} onClick={this.props.homeButtonClickedHandler}>
                    <FontIcon className="material-icons">home</FontIcon>
                </FloatingActionButton>
            </div>
            {this.props.clickingData[dataModels.ClickCountTypes.homeButtonClick] && <p className={styles.clickingDataText}>
                {$t.formatMessage({id: 'clickingExample.homeButtonClicked'}, 
                    {count: this.props.clickingData[dataModels.ClickCountTypes.homeButtonClick]})}
            </p>}
            {this.props.clickingData[dataModels.ClickCountTypes.homeButtonClickOutside] && <p className={styles.clickingDataText}>
                {$t.formatMessage({id: 'clickingExample.homeButtonClickedOutside'}, 
                    {count: this.props.clickingData[dataModels.ClickCountTypes.homeButtonClickOutside]})}
            </p>}
        </div>
    }
}

export default ClickingPanel;

