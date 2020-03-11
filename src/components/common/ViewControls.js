import React, { useState } from 'react'
import styles from './vc.module.css'
import { CreateButton } from './FormControls'
import Switch from 'react-switch'

const ViewControls = props => {
  const [isDev, setDev] = useState(false)
  //const { toggleListView, toggleGridView } = props

  const toggleEnv = () => {
    setDev(!isDev)
  }

  return (
    <div className={`${isDev ? styles.barActive : ''} ${styles.bar}`}>
      <div className="d-flex align-items-center">
        Dev&nbsp;
        <Switch
          onChange={toggleEnv}
          checked={isDev}
          uncheckedIcon={false}
          checkedIcon={false}
          onColor={'#ff5e6d'}
        />
        &nbsp;Prod
      </div>
      <CreateButton>Create Challenge</CreateButton>
    </div>
  )
}

export default ViewControls
/*
<ButtonGroup aria-label="Basic example">
  <Button variant="secondary" onClick={toggleListView}><FontAwesomeIcon icon="list" size="1x"/></Button>
  <Button variant="secondary" onClick={toggleGridView}><FontAwesomeIcon icon="th-large" size="1x"/></Button>
</ButtonGroup>
*/
