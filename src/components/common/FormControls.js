import React from 'react'
import styles from './fc.module.css'
import { useField } from 'formik'
import { Form } from 'react-bootstrap'
/*
export const FieldInputGroup = ({ ...props }) => {
  const [field, meta] = useField(props)
  return (
    <Form.Group controlId="formEmail">
      <Form.Label className="sr-only">Email :</Form.Label>
      <Form.Control
        size="lg"
        type="text"
        name="username"
        placeholder="Email"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.username}
        className={touched.username && errors.username ? "error" : null}
        />
        {touched.username && errors.username ? (
      <Form.Text className="text-danger">{errors.username}</Form.Text>
      ): null}
    </Form.Group>
  )
}
*/
export const FieldInput = ({ ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className={styles.c}>
      <label htmlFor={props.id || props.name}></label>
      <input
        className={meta.error && meta.touched ? styles.dmife : styles.dmif}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className={styles.e}>{meta.error}</div>
      ) : null}
    </div>
  )
}

export const SubmitButton = props => (
  <button type="submit" className={styles.pr} onClick={props.onClick}>
    {props.children}
  </button>
)