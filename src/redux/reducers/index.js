import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import ChallengeReducer from './ChallengeReducer'
import BadgeReducer from './BadgeReducer'
import EnvReducer from './EnvReducer'

const rootReducer = combineReducers({
  auth: AuthReducer,
  challenges: ChallengeReducer,
  badges: BadgeReducer,
  env: EnvReducer
})

export default rootReducer
