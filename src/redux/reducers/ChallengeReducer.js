import {
  CHALLENGES,
  CHALLENGES_LOADING,
  CHALLENGES_ERROR
} from '../../constants/ChallengeActionConstants'

const initialState = {
  data: null,
  loading: true,
  error: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CHALLENGES: {
      return {
        ...state,
        data: action.data,
        loading: false,
        error: null
      }
    }
    case CHALLENGES_LOADING: {
      return {
        ...state,
        data: null,
        loading: true,
        error: null
      }
    }
    case CHALLENGES_ERROR: {
      return {
        ...state,
        data: null,
        loading: false,
        error: ''
      }
    }
    default:
      return state
  }
}
