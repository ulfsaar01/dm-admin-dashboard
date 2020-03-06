import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Form } from 'react-bootstrap'
import { ReactComponent as Logo } from '../assets/dm-d-logo.svg'
import styles from './lo.module.css'
import { FieldInput, SubmitButton } from '../components/common/FormControls'
import { Formik } from 'formik'
import { login } from '../redux/actions/AuthActions'

const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  
  if(isAuthenticated === true) {
    history.push('/console')
  }

  return (
    <div className={`${styles.wr} bg-dark`}>
      <Formik
        initialValues={{ username: '', password: '', email: '' }}
        onSubmit={(values, { setSubmitting, setFieldError, setFieldValue }) => {
          const { username, password } = values;
          dispatch(login(username, password)).then(_ => {
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
        {( {handleSubmit,
          isSubmitting }) => (
      <Form className={styles.formsignin}>
        <div className="text-center">
          <Logo className={`${styles.logo} mb-5`}/>
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
        <SubmitButton type="submit" onClick={handleSubmit}>
        Log In
        </SubmitButton>
        <p className="mt-5 mb-3 text-muted text-center">🏎 © 2020</p>
      </Form>
      )}
      </Formik>
    </div>
  )
}

export default Login
