import React from 'react'

import { Card } from 'react-bootstrap'
import styles from './he.module.css'

//import { ReactComponent as Couch } from '../assets/038-couch.svg'
//import { ReactComponent as Plant } from '../../assets/039-plant.svg'
//import { ReactComponent as Paint } from '../assets/003-paint-bucket.svg'

const Hero = props => {
  return (
    <div
      className={`${styles.splash} ${styles.sky} d-flex justify-content-center align-items-center align-self-center mb-5`}
    >
      <div className={styles.splashInfo}></div>
      <div className={styles.splashPicContainer}></div>
      <div className={styles.options}>
        <div className="justify-content-md-center">
          <Card className="rounded shadow-sm">
            <Card.Body className="p-0 text-center"></Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Hero
