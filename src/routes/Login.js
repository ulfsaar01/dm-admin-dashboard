import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Form } from 'react-bootstrap'
import { ReactComponent as Logo } from '../assets/dm-d-logo.svg'
import styles from './lo.module.css'
import { SubmitButton } from '../components/common/FormControls'
import { Formik } from 'formik'

const Login = () => {
  const history = useHistory()
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const onAuthenticated = () => {
    if (isAuthenticated === true) {
      history.push('/')
    }
  }
  useEffect(onAuthenticated, [isAuthenticated])

  return (
    <div className={styles.wr}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, { setSubmitting, setFieldError, setFieldValue }) => {
          console.log("HI")
        }}
      >
        {( {values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting }) => (
      <Form className={styles.formsignin}>
        <Logo className={`${styles.logo} mb-5`}/>

        <Form.Group controlId="formBasicEmail">
          <Form.Label className="sr-only">Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            size="lg"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label className="sr-only">Password</Form.Label>
          <Form.Control
            type="password" 
            placeholder="Password" 
            size="lg"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
        </Form.Group>
        <SubmitButton type="submit" title="Log In"/>
        <p className="mt-5 mb-3 text-muted">🏎 © 2020</p>
      </Form>
      )}
      </Formik>
    </div>
  )
}

export default Login
