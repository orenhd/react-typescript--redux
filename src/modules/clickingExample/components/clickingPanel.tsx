import * as React from "react";

import PropTypes from "prop-types";

import { $t } from '../../../i18n/i18n.service'

import { NavLink, Route } from 'react-router-dom';

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

class ClickingPanel extends React.Component<ClickingPanelProps, {}> {

    public static propTypes: PropTypes.ValidationMap<ClickingPanelProps>;

    /* Private Class Properties */

    private homeButtonWrapperRef: HTMLDivElement | null;

    /* Lifecycle Methods */

    componentDidMount() {
        this.boundDocumentClickHandler = getDocumentClickHandler(this, this.homeButtonWrapperRef, this.props.homeButtonClickedOutsideHandler);
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
            <p className={styles.clickingDataText} style={{display: this.props.clickingData[dataModels.ClickCountTypes.homeButtonClick]? 'block' : 'none'}}>
                {$t.formatMessage({id: 'clickingExample.homeButtonClicked'}, 
                    {count: this.props.clickingData[dataModels.ClickCountTypes.homeButtonClick]})}
            </p>
            <p className={styles.clickingDataText} style={{display: this.props.clickingData[dataModels.ClickCountTypes.homeButtonClickOutside] ? 'block' : 'none'}}>
                {$t.formatMessage({id: 'clickingExample.homeButtonClickedOutside'}, 
                    {count: this.props.clickingData[dataModels.ClickCountTypes.homeButtonClickOutside]})}
            </p>
        </div>
    }
}

/* We can still use propTypes for dynamic type-checking ;) */
ClickingPanel.propTypes = {
    clickingData: PropTypes.object.isRequired,
    homeButtonClickedHandler: PropTypes.func.isRequired,
    homeButtonClickedOutsideHandler: PropTypes.func.isRequired
}

export default ClickingPanel;

