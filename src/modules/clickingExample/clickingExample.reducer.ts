import { Action } from 'redux';

import { SET_USER_NAME, UPDATE_CLICKING_DATA } from './clickingExample.actions';

import * as dataModels from './clickingExample.dataModels';

export interface state {
  userName: string;
  clickingData: dataModels.ClickingData;
}

const initialState: state = {
  userName: 'World',
  clickingData: {}
}

export function reducer(state: state = initialState, action: any) {
  switch (action.type) {
    case SET_USER_NAME:
      return { ...state, userName: action.userName };
    case UPDATE_CLICKING_DATA:
      return { ...state, clickingData: action.clickingData };
    default:
      return state;
  }
}