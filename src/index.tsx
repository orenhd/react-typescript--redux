/**
 * index.ts
 * - Responsible only for init. of the React instacne, 
 * by rendering the main Application Component, along with its localization, material-ui theming and routing
 **/

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { HashRouter } from 'react-router-dom';

import {IntlProvider} from 'react-intl';

import * as i18nService from "./i18n/i18n.service";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Application from "./application/application"

import { store } from "./application/application.store";

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider locale={i18nService.locale} messages={i18nService.messages} key={i18nService.locale}>
            <MuiThemeProvider>
                <HashRouter>
                    <Application/>
                </HashRouter>
            </MuiThemeProvider>
        </IntlProvider>
    </Provider>,
    document.getElementById("app")
);