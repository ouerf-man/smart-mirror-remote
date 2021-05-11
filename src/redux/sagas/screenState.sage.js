import {
    put,
    call,
    takeLatest,
    takeEvery
} from 'redux-saga/effects'

import * as screenActions from "../actions/screenState.action"

import * as apiService from "../../services/api.service"

function* getScreenState() {
    yield put({ type: screenActions.SET_LOADING })

    const screen = yield call(apiService.getCurrentState, "14767621")
    yield put({ type: screenActions.GET_SCREEN_STATE, payload: screen })
}

function* updateScreen({ payload }) {
    yield put({ type: screenActions.SET_LOADING })
    const newScreen = yield call(apiService.updateScreen, "14767621", payload)
    yield put({ type: screenActions.UPDATE_SCREEN_STATE, payload: newScreen.data })
}

export default function* todoSage() {
    yield takeEvery(screenActions.GET_SCREEN_STATE_REQUESTED, getScreenState)
    yield takeLatest(screenActions.UPDATE_SCREEN_STATE_REQUESTED, updateScreen)
}