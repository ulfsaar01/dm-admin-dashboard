import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import ChallengeReducer from './ChallengeReducer'
import BadgeReducer from './BadgeReducer'
import GiftReducer from './GiftReducer'
import UserInspirationReducer from './UserInspirationReducer'
import { USER_INVALID } from '../../constants/AuthActionsConstants'

const appReducer = combineReducers({
  auth: AuthReducer,
  challenges: ChallengeReducer,
  badges: BadgeReducer,
  gifts: GiftReducer,
  inspirations: UserInspirationReducer
})

const rootReducer = (state, action) => {
  if (action.type === USER_INVALID) {
    const { challenges, badges, gifts, inspirations } = state
    state = { challenges, badges, gifts, inspirations }
  }
  return appReducer(state, action)
}

export default rootReducer
