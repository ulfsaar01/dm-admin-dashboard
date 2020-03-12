import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Form } from 'react-bootstrap'
import { ReactComponent as Logo } from '../assets/dm-d-logo.svg'
import styles from './lo.module.css'
import {
  FieldInput,
  SubmitButton,
  SubmitAltButton
} from '../components/common/FormControls'
import { Formik } from 'formik'
import { login } from '../redux/actions/AuthActions'
import Switch from 'react-switch'
//import { appId, baseUrl, setToDev, setToProd } from '../data/envStorage.js'
import { setToDev as setToDevAction, setToProd as setToProdAction } from '../redux/actions/EnvActions'

const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [switchProd] = useState(false)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const { isProd, appId, baseUrl } = useSelector(state => state.env)

  if (isAuthenticated === true) {
    history.push('/console')
  }

  useEffect(() => {
    dispatch(setToDevAction())
    //console.log(isProd)
    //setSwitchProd(isProd)
  }, [dispatch])
  //const [isProd, setProd] = useState(false)
  //const { toggleListView, toggleGridView } = props

  const toggleEnv = () => {
    console.log(switchProd)
    //setSwitchProd(!switchProd)
    
    
    if(isProd === false) {
      dispatch(setToProdAction())
      
    } else {
      dispatch(setToDevAction())
    }

    console.log(isProd, appId, baseUrl)
    
  }

  return (
    <div
      className={`${isProd ? styles.redalert : styles.standdown} ${styles.wr}`}
    >
      <Formik
        initialValues={{ username: '', password: '', email: '' }}
        onSubmit={(values, { setSubmitting, setFieldError, setFieldValue }) => {
          const { username, password } = values
          dispatch(login(username, password))
            .then(_ => {
              setSubmitting(false)
              history.push('/console')
            })
            .catch(error => {
              setFieldError('username', error)
              setFieldValue('password', '', false)
              setSubmitting(false)
            })
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form className={styles.formsignin}>
            <div className="text-center">
              <Logo
                className={`${styles.logo} ${
                  isProd ? styles.lProd : styles.lDev
                } mb-5`}
              />
            </div>
            <FieldInput
              name="username"
              type="username"
              placeholder="Email"
              disabled={isSubmitting}
            />
            <FieldInput
              name="password"
              type="password"
              placeholder="Password"
              disabled={isSubmitting}
            />
            <div className="text-center">
              <div
                className={`${
                  isProd ? 'text-white' : 'text-white'
                } d-flex align-items-center font-weight-bold 
              justify-content-center mt-2 mb-4`}
              >
                Dev&nbsp;&nbsp;
                <Switch
                  onChange={toggleEnv}
                  checked={isProd}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  onColor={'#00CC00'}
                />
                &nbsp;&nbsp;Prod
              </div>
              {isProd ? (
                <SubmitAltButton type="submit" onClick={handleSubmit}>
                  Log In
                </SubmitAltButton>
              ) : (
                <SubmitButton type="submit" onClick={handleSubmit}>
                  Log In
                </SubmitButton>
              )}

              <p className="mt-5 mb-3 text-white text-center">
                {isProd ? '🚀' : '🏎'} DecorMatters © 2020
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Login
