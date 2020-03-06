import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, ButtonGroup } from 'react-bootstrap'
import styles from './vc.module.css'
import { CreateButton } from './FormControls'

const ViewControls = () => {
  return (
    <div className={styles.bar}>
      <ButtonGroup aria-label="Basic example">
        <Button variant="secondary"><FontAwesomeIcon icon="list" size="1x"/></Button>
        <Button variant="secondary"><FontAwesomeIcon icon="th-large" size="1x"/></Button>
      </ButtonGroup>
      <h4>Challenges</h4>
      <CreateButton>Create Challenge</CreateButton>
    </div>
  )
}

export default ViewControls
