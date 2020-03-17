import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { appId, baseUrl } from './data/envStorage.js'

export const getHeaders = () => {
  const token = localStorage.getItem('userParseSessionToken')
    ? localStorage.getItem('userParseSessionToken')
    : undefined
  const headers = {
    'Content-Type': 'application/json',
    'X-Parse-Application-Id': appId()
  }

  if (token) {
    headers['X-Parse-Session-Token'] = token
  }

  //console.log(headers)
  return headers
}

export const useFetch = functionName => {
  const [state, setState] = useState({ data: null, loading: true })

  const isCurrent = useRef(true)

  useEffect(() => {
    return () => {
      isCurrent.current = false
    }
  }, [])

  useEffect(() => {
    setState({ designContests: null, loading: true })
    async function fetchData() {
      let featuredAt = new Date()
      featuredAt.setDate(featuredAt.getDate() + 1000)
      const appendant = {
        method: 'POST',
        mode: 'cors',
        headers: getHeaders(),
        body: JSON.stringify({ featuredAt })
      }
      const fullUrl = `${baseUrl()}${functionName}`
      let response = await fetch(fullUrl, appendant)
      let data = await response.json()
      console.log('logging network')
      if (isCurrent.current) {
        setState({ data, loading: false })
      }
    }
    fetchData()
  }, [functionName, setState])
  return state
}

export const api = async (functionName, body, method = 'POST') => {
  const url = `${baseUrl()}${functionName}`
  //console.log(url)
  const appendant = {
    method,
    headers: getHeaders(),
    body
  }
  let response = await fetch(url, appendant)
  return response.json()
}

export const sendBase64File = async (signedUrl, file) => {
  //debugger;
  try {
    const result = await axios.put(signedUrl, file, {
      headers: {
        'Content-Type': file.type
      }
    })
    //debugger
    return result
  } catch (e) {
    //debugger
    console.log(e)
  }
}
