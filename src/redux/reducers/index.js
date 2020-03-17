import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import ChallengeReducer from './ChallengeReducer'
import BadgeReducer from './BadgeReducer'
import GiftReducer from './GiftReducer'
import { USER_INVALID } from '../../constants/AuthActionsConstants'

const appReducer = combineReducers({
  auth: AuthReducer,
  challenges: ChallengeReducer,
  badges: BadgeReducer,
  gifts: GiftReducer
})

const rootReducer = (state, action) => {
  if (action.type === USER_INVALID) {
    const { challenges, badges, gifts } = state
    state = { challenges, badges, gifts }
  }
  return appReducer(state, action)
}

export default rootReducer
