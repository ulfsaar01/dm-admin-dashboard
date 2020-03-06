import React, { useState } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import ChallengesListView from '../components/challenges/ChallengesListView'
import ViewControls from '../components/common/ViewControls'
import styles from './co.module.css'

const Challenges = props => {
  const { isActive } = props
  const [isGridView, setGridView] = useState(true)

  return (
    <div className={styles.wrap}>
      <ViewControls/>
      <ChallengesListView/>
    </div>
  )
}

export default Challenges
