import { getHeaders } from '../../useFetch'
import {
  CHALLENGES,
  CHALLENGES_PAGE,
  CHALLENGES_ERROR
} from '../../constants/ChallengeActionConstants'
import { baseUrl } from '../../data/envStorage.js'

export const challenges = () => {
  let featuredAt = new Date()
  featuredAt.setDate(featuredAt.getDate() + 1000)

  const appendant = {
    method: 'POST',
    mode: 'cors',
    headers: getHeaders(),
    body: JSON.stringify({})
  }

  const fullUrl = `${baseUrl()}getDesignContests3`
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

export const challengesFeed = page => {
  if (!page) page = 0

  const appendant = {
    method: 'POST',
    mode: 'cors',
    headers: getHeaders(),
    body: JSON.stringify({
      skip: page * 15
    })
  }

  const fullUrl = `${baseUrl()}getDesignContests3`
  return async dispatch => {
    try {
      const response = await fetch(fullUrl, appendant)
      const responseJson = await response.json()

      if(page < 1) {
        dispatch({ type: CHALLENGES, data: responseJson })
      } else {
        dispatch({ type: CHALLENGES_PAGE, data: responseJson, page })
      }
      
    } catch (error) {
      dispatch({ type: CHALLENGES_ERROR, error: error })
    }
  }
}
