import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import ChallengeReducer from './ChallengeReducer'

const rootReducer = combineReducers({
  auth: AuthReducer,
  challenges: ChallengeReducer
})

export default rootReducer
