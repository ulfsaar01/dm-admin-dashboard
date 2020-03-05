import React from 'react'
import styles from './fc.module.css'
import { useField } from 'formik'

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

export const SubmitButton = ({ title, ...props }) => (
  <button type="submit" className={styles.pr} {...props}>
    {title}
  </button>
)