import {
  CHALLENGES,
  CHALLENGES_PAGE,
  CHALLENGES_LOADING,
  CHALLENGES_ERROR
} from '../../constants/ChallengeActionConstants'

const initialState = {
  data: [],
  loading: true,
  error: '',
  page: 1
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CHALLENGES: {
      return {
        ...state,
        data: [...action.data.result.designContests],
        page: 1,
        loading: false,
        error: null
      }
    }
    case CHALLENGES_PAGE: {
      return {
        ...state,
        data: [...state.data, ...action.data.result.designContests],
        page: action.page + 1,
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
