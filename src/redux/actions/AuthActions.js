import { Auth } from 'aws-amplify'
import {
  USER_VALID,
  USER_INVALID
} from '../../constants/AuthActionsConstants'

export const login = ({ email, password }) => async dispatch => {
  console.log('[Parse][AuthActions] Logging In: ' + email)
  try {
    //const user = await Auth.signIn(email, password)
    //console.log(user)
    
  } catch (error) {
    throw error;
  }
}

export const logout = history => {
  return dispatch => {
    console.log('[Parse][AuthActions] Logging Out')
    //Auth.signOut()
  }
}