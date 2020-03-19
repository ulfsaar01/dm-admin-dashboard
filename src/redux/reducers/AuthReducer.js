import { USER_VALID, USER_INVALID } from '../../constants/AuthActionsConstants'

const initialState = {
  isAuthenticated: false,
  isLimited: false,
  user: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_VALID: {
      return {
        user: action.user,
        isLimited: action.isLimited,
        isAuthenticated: true
      }
    }
    case USER_INVALID: {
      return {
        user: null,
        isLimited: false,
        isAuthenticated: false
      }
    }
    default:
  }

  return state
}
