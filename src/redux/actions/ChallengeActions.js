import { getHeaders } from '../../useFetch'
import {
  CHALLENGES,
  CHALLENGES_ERROR
} from '../../constants/ChallengeActionConstants'

export const challenges = () => {
  let featuredAt = new Date()
  featuredAt.setDate(featuredAt.getDate() + 1000)

  const appendant = {
    method: 'POST',
    mode: 'cors',
    headers: getHeaders(),
    body: JSON.stringify({ featuredAt })
  }

  const fullUrl = `${process.env.REACT_APP_SERVER_URL}getDesignContests3`
  return async dispatch => {
    try {
      const response = await fetch(fullUrl, appendant)
      const responseJson = await response.json()
      dispatch({ type: CHALLENGES, data: responseJson })
    } catch (error) {
      dispatch({ type: CHALLENGES_ERROR, error: error })
    }
  }
}
