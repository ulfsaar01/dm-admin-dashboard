import React, { useState } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './co.module.css'

const ChallengesDetail = props => {
  const state = props.location.state


  
  console.log(state.contest)
  return (
    <div className={styles.wrap}>
        Hamburger!!
        {JSON.stringify(state.contest)}
    </div>
  )
}

export default ChallengesDetail
