import { Action, ActionCreator, Dispatch } from 'redux';

import { State } from '../../application/application.store';

import * as dataModels from './clickingExample.dataModels';

export const SET_USER_NAME: string = 'SET_USER_NAME';
export const setUserName:ActionCreator<Action> = (userName: string) => {
    return {
        type: SET_USER_NAME,
        userName
    }
}

export const UPDATE_CLICKING_DATA: string = 'UPDATE_CLICKING_DATA';
export const updateClickingData = (clickCountType: dataModels.ClickCountTypes) => (dispatch: Dispatch<State>, getState: () => State) => {
    
    const { clickingData } = getState().clickingExample;
    const updateClickingData = { ...clickingData };

    const currentTypeCount = updateClickingData[clickCountType] || 0;

    updateClickingData[clickCountType] = currentTypeCount + 1;

    dispatch({
        type: UPDATE_CLICKING_DATA,
        clickingData: updateClickingData
    })
}