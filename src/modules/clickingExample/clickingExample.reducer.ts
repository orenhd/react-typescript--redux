import { Action } from 'redux';

import { SET_USER_NAME, HOME_BUTTON_CLICKED, HOME_BUTTON_CLICKED_OUTSIDE } from './clickingExample.actions';

import * as dataModels from './clickingExample.dataModels';

export interface state {
  userName: string;
  clickingData: dataModels.ClickingData | null;
}

const initialState: state = {
  userName: 'World',
  clickingData: { homeButtonClickCount: 0, homeButtonClickOutsideCount: 0 }
}

export function reducer(state: state = initialState, action: any) {
  switch (action.type) {
    case SET_USER_NAME:
      return { ...state, userName: action.userName };
    case HOME_BUTTON_CLICKED:
      return { ...state, clickingData: {...state.clickingData, homeButtonClickCount: state.clickingData ? ++state.clickingData.homeButtonClickCount : 1} };
    case HOME_BUTTON_CLICKED_OUTSIDE:
      return { ...state, clickingData: {...state.clickingData, homeButtonClickOutsideCount: state.clickingData ? ++state.clickingData.homeButtonClickOutsideCount : 1} };
    default:
      return state;
  }
}