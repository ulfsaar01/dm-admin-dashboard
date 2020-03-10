import {
  BADGES,
  BADGES_LOADING,
  BADGES_ERROR
} from '../../constants/BadgeActionConstants'

const initialState = {
  data: null,
  loading: true,
  error: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case BADGES: {
      return {
        ...state,
        data: action.data,
        loading: false,
        error: null
      }
    }
    case BADGES_LOADING: {
      return {
        ...state,
        data: null,
        loading: true,
        error: null
      }
    }
    case BADGES_ERROR: {
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
