import { getHeaders, api } from '../../useFetch'
import { USER_VALID, USER_INVALID } from '../../constants/AuthActionsConstants'
import { baseUrl, deleteEnvStorage } from '../../data/envStorage.js'

export const validateUser = () => dispatch => {
  const token = localStorage.getItem('userParseSessionToken')
    ? localStorage.getItem('userParseSessionToken')
    : undefined

  const user = localStorage.getItem('user')
    ? localStorage.getItem('user')
    : undefined

  if (token && user) {
    dispatch({ type: USER_VALID, user: JSON.parse(user) })
  } else {
    dispatch({ type: USER_INVALID })
  }
}

export const login = (username, password) => async dispatch => {
  console.log('[Parse][AuthActions] Logging In: ' + username)
  const body = JSON.stringify({
    username,
    password
  })

  localStorage.removeItem('userParseSessionToken')
  localStorage.removeItem('user')

  let data = await api('logInWithEmail1', body)

  if (data.error) {
    throw data.error
  } else {
    const user = data.result

    localStorage.setItem('userParseSessionToken', user.sessionToken)
    localStorage.setItem('user', JSON.stringify(user))
    
    const isLimited = user.username === 'dmqa@lodestoneco.com' ? true : false

    dispatch({ type: USER_VALID, user: user, isLimited: isLimited })
  }
}

export const logout = () => {
  console.log('[Parse][AuthActions] Logging Out')
  //console.log(getHeaders())
  const appendant = {
    method: 'POST',
    mode: 'cors',
    headers: getHeaders(),
    body: JSON.stringify({})
  }

  const fullUrl = `${baseUrl()}logOut`
  return async dispatch => {
    try {
      await fetch(fullUrl, appendant)
      localStorage.removeItem('userParseSessionToken')
      localStorage.removeItem('user')
      deleteEnvStorage()
      dispatch({ type: USER_INVALID })
    } catch (error) {
      localStorage.removeItem('userParseSessionToken')
      localStorage.removeItem('user')
      deleteEnvStorage()
      dispatch({ type: USER_INVALID })
    }
  }
}
