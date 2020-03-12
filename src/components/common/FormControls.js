import React from 'react'
import styles from './fc.module.css'
import { useField } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form } from 'react-bootstrap'
import { NumberPicker } from 'react-widgets'

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

export const DMInputGroup = ({ disabled, ...props }) => {
  return (
    <Form.Group>
      <Form.Label>{props.title}</Form.Label>
      <Form.Control
        type="text"
        id={props.id}
        name={props.id}
        value={props.values[props.id]}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        className={`form-control ${props.errors[props.id] ? 'is-invalid' : ''}`}
        isInvalid={!!props.errors[props.id]}
        disabled={disabled}
      />
      {props.errors[props.id] && props.touched[props.id] && (
        <div className="p-0 m-0 text-danger">{props.errors[props.id]}</div>
      )}
    </Form.Group>
  )
}

export const DMSelectGroup = ({ disabled, ...props }) => {
  return (
    <Form.Group>
      <Form.Label>{props.title}</Form.Label>
      <Form.Control
        as="select"
        id={props.id}
        name={props.id}
        value={props.values[props.id]}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        className={`form-control ${props.errors[props.id] ? 'is-invalid' : ''}`}
        disabled={disabled}
        isInvalid={!!props.errors[props.id]}
      >
        {props.children}
      </Form.Control>
      {props.errors[props.id] && props.touched[props.id] && (
        <div className="p-0 m-0 text-danger">{props.errors[props.id]}</div>
      )}
    </Form.Group>
  )
}

export const DMTextAreaGroup = ({ disabled, rows, ...props }) => {
  return (
    <Form.Group>
      <Form.Label>{props.title}</Form.Label>
      <Form.Control
        as="textarea"
        rows={rows}
        id={props.id}
        name={props.id}
        value={props.values[props.id]}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        className={`form-control ${props.errors[props.id] ? 'is-invalid' : ''}`}
        disabled={disabled}
        isInvalid={!!props.errors[props.id]}
      >
        {props.children}
      </Form.Control>
      {props.errors[props.id] && props.touched[props.id] && (
        <div className="p-0 m-0 text-danger">{props.errors[props.id]}</div>
      )}
    </Form.Group>
  )
}

export const DMNumberGroup = ({ disabled, min, max, ...props }) => {
  return (
    <Form.Group controlId="exampleForm.ControlInput1">
      <Form.Label>{props.title}</Form.Label>
      <NumberPicker
        type={'number'}
        id={props.id}
        name={props.id}
        min={min}
        max={max}
        value={props.values[props.id]}
        selected={
          (props.values[props.id] && new Date(props.values[props.id])) || null
        }
        onChange={v => {
          props.setFieldValue(props.id, v)
        }}
        onBlur={props.handleBlur}
        disabled={disabled}
        isInvalid={!!props.errors[props.id]}
      />
      {props.errors[props.id] && props.touched[props.id] && (
        <div className="p-0 m-0 text-danger">{props.errors[props.id]}</div>
      )}
    </Form.Group>
  )
}

export const DMImageUploadGroup = ({ disabled, onUpload, url, ...props }) => {
  return (
    <Form.Group className="text-center justify-content-center m-0">
      <Form.Label>{props.title}</Form.Label>
      <div className={`${styles.imgViewer} m-auto`}>
        {url ? null : (
          <div className={styles.imgIconContainerWrapper}>
            <div className={styles.imgIconContainer}>
              <FontAwesomeIcon
                icon="image"
                size="3x"
                className={styles.imgIcon}
              />
            </div>
          </div>
        )}
        <div
          className={styles.imgContainer}
          style={{ backgroundImage: `url(${url})` }}
        ></div>
      </div>

      <Form.Control
        type="file"
        id={props.id}
        name={props.id}
        onChange={event => {
          onUpload(event, props.id)
          event.target.value = null
        }}
        className="form-control border-0"
        hidden
      />
      {!disabled ? (
        <label
          htmlFor={props.id}
          className="btn btn-light mt-2 rounded-pill px-4"
        >
          <FontAwesomeIcon
            icon="cloud-upload-alt"
            size="1x"
            className={`${styles.imgIcon} mr-2`}
          />
          <small className="text-uppercase font-weight-bold text-muted">
            Choose Image
          </small>
        </label>
      ) : null}
    </Form.Group>
  )
}

export const SubmitButton = props => (
  <button type="submit" className={styles.pr} {...props}>
    {props.children}
  </button>
)

export const SubmitAltButton = props => (
  <button type="submit" className={styles.par} {...props}>
    {props.children}
  </button>
)

export const CreateButton = props => (
  <button type="submit" className={styles.pr} onClick={props.onClick}>
    <FontAwesomeIcon icon="brush" size="1x" className={styles.pri} />
    {props.children}
  </button>
)

export const CreateAltButton = props => (
  <button type="submit" className={styles.par} onClick={props.onClick}>
    <FontAwesomeIcon icon="brush" size="1x" className={styles.pari} />
    {props.children}
  </button>
)

export const EditButton = props => (
  <button type="button" className={styles.cr} onClick={props.onClick}>
    <FontAwesomeIcon icon="pencil-alt" size="1x" className={styles.cri} />
    Edit
  </button>
)

export const CancelButton = props => (
  <button type="button" className={styles.cr} onClick={props.onClick}>
    <FontAwesomeIcon icon="times" size="1x" className={styles.cri} />
    Cancel
  </button>
)

export const DeleteButton = props => (
  <button type="button" className={styles.dr} onClick={props.onClick}>
    <FontAwesomeIcon icon="skull" size="1x" className={styles.dri} />
    Delete
  </button>
)

export const BackButton = props => (
  <button className="roundBtn" onClick={props.onClick}>
    <FontAwesomeIcon icon="chevron-left" color="#6c757d" size="lg" />
  </button>
)

export const BackLongButton = props => (
  <button className={styles.zr} onClick={props.onClick}>
    <FontAwesomeIcon icon="chevron-left" size="lg" className={styles.zri} />
    {props.children}
  </button>
)
