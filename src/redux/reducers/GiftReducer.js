import {
  GIFTS,
  GIFTS_LOADING,
  GIFTS_ERROR
} from '../../constants/GiftActionConstants'

const initialState = {
  data: null,
  loading: true,
  error: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GIFTS: {
      return {
        ...state,
        data: action.data,
        loading: false,
        error: null
      }
    }
    case GIFTS_LOADING: {
      return {
        ...state,
        data: null,
        loading: true,
        error: null
      }
    }
    case GIFTS_ERROR: {
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
