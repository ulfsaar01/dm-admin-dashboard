import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form } from 'react-bootstrap'
import { ReactComponent as Logo } from '../assets/dm-d-logo.svg'
import styles from './lo.module.css'
import {
  DMAuthInputGroup,
  SubmitButton,
  SubmitAltButton
} from '../components/common/FormControls'
import { Formik } from 'formik'
import { login } from '../redux/actions/AuthActions'
import Switch from 'react-switch'
import {
  setToDev,
  setToProd
} from '../data/envStorage.js'

const Login = () => {
  const dispatch = useDispatch()
  const [switchProd, setSwitchProd] = useState(false)

  const toggleEnv = () => {
    setSwitchProd(!switchProd)
  }

  return (
    <div
      className={`${switchProd ? styles.redalert : styles.standdown} ${
        styles.wr
      }`}
    >
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values, { setSubmitting, setFieldError, setFieldValue }) => {
          const { username, password } = values

          switchProd ? setToProd() : setToDev()

          dispatch(login(username, password))
            .then()
            .catch(error => {
              setFieldError('username', error)
              setFieldValue('password', '', false)
              setSubmitting(false)
            })
        }}
      >
        {props => {
          const { isSubmitting, handleSubmit } = props
          return (
            <Form className={styles.formsignin}>
              <div className="text-center">
                <Logo
                  className={`${styles.logo} ${
                    switchProd ? styles.lProd : styles.lDev
                  } mb-5`}
                />
              </div>
              <DMAuthInputGroup
                type="text"
                title="username"
                id="username"
                placeholder="Email"
                disabled={isSubmitting}
                {...props}
              />
              <DMAuthInputGroup
                type="password"
                title="password"
                id="password"
                placeholder="Password"
                disabled={isSubmitting}
                {...props}
              />
              <div className="text-center">
                <div
                  className={`${
                    switchProd ? 'text-white' : 'text-white'
                  } d-flex align-items-center font-weight-bold 
              justify-content-center mt-2 mb-4`}
                >
                  Dev&nbsp;&nbsp;
                  <Switch
                    onChange={toggleEnv}
                    checked={switchProd}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    onColor={'#00CC00'}
                  />
                  &nbsp;&nbsp;Prod
                </div>
                {switchProd ? (
                  <SubmitAltButton type="submit" onClick={handleSubmit}>
                    Log In
                  </SubmitAltButton>
                ) : (
                  <SubmitButton type="submit" onClick={handleSubmit}>
                    Log In
                  </SubmitButton>
                )}

                <p className="mt-5 mb-3 text-white text-center">
                  {switchProd ? '🚀' : '🏎'} DecorMatters © 2020
                </p>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default Login
