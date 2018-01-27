// @flow

import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { reducer as dataSet } from 'redux-dataset'

export const intitialState = {

}

export default combineReducers({ form, dataSet })
