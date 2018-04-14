import { Action, ActionCreator } from 'redux';

import { State } from '../../application/application.store';

import * as dataModels from './clickingExample.dataModels';

export const SET_USER_NAME: string = 'SET_USER_NAME';
export const setUserName:ActionCreator<Action> = (userName: string) => {
    return {
        type: SET_USER_NAME,
        userName
    }
}

export const HOME_BUTTON_CLICKED: string = 'HOME_BUTTON_CLICKED';
export const homeButtonClicked:ActionCreator<Action> = () => {
    return {
        type: HOME_BUTTON_CLICKED,
    }
}

export const HOME_BUTTON_CLICKED_OUTSIDE: string = 'HOME_BUTTON_CLICKED_OUTSIDE';
export const homeButtonClickedOutside:ActionCreator<Action> = () => {
    return {
        type: HOME_BUTTON_CLICKED_OUTSIDE
    }
}