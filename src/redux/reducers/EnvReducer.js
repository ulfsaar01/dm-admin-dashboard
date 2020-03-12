import { IS_PROD, IS_DEV } from '../../constants/EnvActionConstants'

const initialState = {
  isProd: false,
  appId: '',
  baseUrl: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case IS_PROD: {
      return {
        isProd: true,
        appId: action.appId,
        baseUrl: action.baseUrl
      }
    }
    case IS_DEV: {
      return {
        isProd: false,
        appId: action.appId,
        baseUrl: action.baseUrl
      }
    }
    default:
  }

  return state
}
