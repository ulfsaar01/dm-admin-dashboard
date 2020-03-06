import React from 'react'
import styles from './fc.module.css'
import { useField } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

export const CreateButton = props => (
  <button type="submit" className={styles.cr} onClick={props.onClick}>
    <FontAwesomeIcon icon="plus" size="1x" className={styles.cri}/>
    {props.children}
  </button>
)