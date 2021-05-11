import * as screenActions from "../actions/screenState.action.js"
const initialState = {
    loading: false,
    screenState: {},
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case screenActions.SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case screenActions.GET_SCREEN_STATE:
            return {
                ...state,
                screenState: payload,
                loading: false,
            }
        case screenActions.UPDATE_SCREEN_STATE:
            return {
                ...state,
                screenState :{
                    ...state.screenState,
                    ...payload
                }
            }
        default:
            return state
    }
}