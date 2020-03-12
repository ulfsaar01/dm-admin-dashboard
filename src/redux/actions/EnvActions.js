import { IS_PROD, IS_DEV } from '../../constants/EnvActionConstants'
import { appId, baseUrl, setToDev as toDev, setToProd as toProd } from '../../data/envStorage.js'

export const setToProd = () => dispatch => {
  toProd()
  dispatch({ type:IS_PROD, appId:appId(), baseUrl:baseUrl()})
}

export const setToDev = () => dispatch => {
  toDev()
  dispatch({ type:IS_DEV, appId:appId(), baseUrl:baseUrl()})
}
