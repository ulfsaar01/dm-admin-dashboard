import { getHeaders } from '../../useFetch'
import { BADGES, BADGES_ERROR } from '../../constants/BadgeActionConstants'
import { baseUrl } from '../../data/envStorage.js'

export const badges = () => {
  let featuredAt = new Date()
  featuredAt.setDate(featuredAt.getDate() + 1000)

  const appendant = {
    method: 'POST',
    mode: 'cors',
    headers: getHeaders()
  }

  const fullUrl = `${baseUrl()}getBadges1`
  return async dispatch => {
    try {
      const response = await fetch(fullUrl, appendant)
      const responseJson = await response.json()
      dispatch({ type: BADGES, data: responseJson.result })
    } catch (error) {
      dispatch({ type: BADGES_ERROR, error: error })
    }
  }
}
