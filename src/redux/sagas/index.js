
import { spawn } from 'redux-saga/effects'

// Sagas
import screenSage from './screenState.sage'

// Export the root saga
export default function* rootSaga() {
  console.log("Hello From Redux-Saga!")

  yield spawn(screenSage)
}