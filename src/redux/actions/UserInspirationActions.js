import { getHeaders } from '../../useFetch'
import {
  USER_INSPIRATIONS_RECENT_PCG,
  USER_INSPIRATIONS_RECENT_PCG_ERROR
} from '../../constants/ActionConstants'
import { baseUrl } from '../../data/envStorage.js'

export const userInspirationsRecentPcg = () => {
  const appendant = {
    method: 'POST',
    mode: 'cors',
    headers: getHeaders(),
    body: JSON.stringify({
      pageLimit: 10,
      userId: '1saiROf5k8'
    })
  }

  const fullUrl = `${baseUrl()}getUserInspirations5`
  return async dispatch => {
    try {
      const response = await fetch(fullUrl, appendant)
      const responseJson = await response.json()
      dispatch({ type: USER_INSPIRATIONS_RECENT_PCG, data: responseJson })
    } catch (error) {
      dispatch({ type: USER_INSPIRATIONS_RECENT_PCG_ERROR, error: error })
    }
  }
}
