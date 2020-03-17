import { getHeaders } from '../../useFetch'
import { GIFTS, GIFTS_ERROR } from '../../constants/GiftActionConstants'
import { baseUrl } from '../../data/envStorage.js'

export const gifts = () => {
  const appendant = {
    method: 'POST',
    mode: 'cors',
    headers: getHeaders(),
    body: JSON.stringify({
      pageLimit: 100
    })
  }

  const fullUrl = `${baseUrl()}getVirtualGifts1`

  return async dispatch => {
    try {
      const response = await fetch(fullUrl, appendant)
      const responseJson = await response.json()
      dispatch({ type: GIFTS, data: responseJson.result })
    } catch (error) {
      dispatch({ type: GIFTS_ERROR, error: error })
    }
  }
}
