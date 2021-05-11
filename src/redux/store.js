import { createStore, applyMiddleware } from 'redux'


// This is the middleware that we gonna use redux-saga
import createSagaMiddleware from 'redux-saga'

// This is the root saga that will contain our sagas, or I should say model? XD
import rootSaga from './sagas'

// This will be contain our reducer for the application
import screenState from './reducers/screenState.reducer'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  screenState,
  {},
  applyMiddleware(sagaMiddleware)
)

// Run redux-saga
sagaMiddleware.run(rootSaga)

export default store