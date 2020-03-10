import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import ChallengeReducer from './ChallengeReducer'
import BadgeReducer from './BadgeReducer'

const rootReducer = combineReducers({
  auth: AuthReducer,
  challenges: ChallengeReducer,
  badges: BadgeReducer
})

export default rootReducer
