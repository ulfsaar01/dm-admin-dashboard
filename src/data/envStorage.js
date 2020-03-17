const storageKeyIsProd = 'isprod'
const storageKeyAppId = 'appid'
const storageKeyBase = 'base'
const devBase = 'https://decormatters-dev.herokuapp.com/parse/functions/'
const prodBase = 'https://decormatters-prod.herokuapp.com/parse/functions/'
const devId = 1
const prodId = 3

//export const isProd = localStorage.getItem(storageKeyIsProd)

export const isProd = () => {
  //console.log("storageKeyIsProd  " + localStorage.getItem(storageKeyIsProd))
  return localStorage.getItem(storageKeyIsProd)
}

export const appId = () => {
  //console.log("storageKeyAppId  " + localStorage.getItem(storageKeyAppId))
  return localStorage.getItem(storageKeyAppId)
}

export const baseUrl = () => {
  //console.log("storageKeyBase  " + localStorage.getItem(storageKeyBase))
  return localStorage.getItem(storageKeyBase)
}

export const setToDev = () => {
  localStorage.setItem(storageKeyAppId, devId)
  localStorage.setItem(storageKeyBase, devBase)
  localStorage.setItem(storageKeyIsProd, false)
}

export const setToProd = () => {
  localStorage.setItem(storageKeyAppId, prodId)
  localStorage.setItem(storageKeyBase, prodBase)
  localStorage.setItem(storageKeyIsProd, true)
}

export const deleteEnvStorage = () => {
  localStorage.removeItem(storageKeyAppId)
  localStorage.removeItem(storageKeyBase)
  localStorage.removeItem(storageKeyIsProd)
}
/*
DEV_BASE = https://decormatters-dev.herokuapp.com/parse/functions/
REACT_APP_SERVER_URL = https://decormatters-dev.herokuapp.com/parse/functions/
#REACT_APP_SERVER_URL = http://localhost:1337/parse/functions/
#REACT_APP_SERVER_URL = https://decormatters-prod.herokuapp.com/parse/functions/
#DEV_BASE = http://localhost:1337/parse/functions/

REACT_APP_APPID = 1
*/
