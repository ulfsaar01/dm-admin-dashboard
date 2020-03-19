import {
  USER_INSPIRATIONS_RECENT_PCG,
  USER_INSPIRATIONS_RECENT_PCG_ERROR
} from '../../constants/ActionConstants'

const initialState = {
  data: null,
  loading: true,
  error: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_INSPIRATIONS_RECENT_PCG: {
      return {
        data: action.data,
        loading: false,
        error: null
      }
    }
    case USER_INSPIRATIONS_RECENT_PCG_ERROR: {
      return {
        data: null,
        loading: false,
        error: action.error
      }
    }
    default:
      return state
  }
}
