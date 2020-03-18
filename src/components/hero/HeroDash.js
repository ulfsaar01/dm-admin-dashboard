import React from 'react'
import styles from './he.module.css'

const Hero = props => {
  return (
    <div
      className={`${styles.splash} ${styles.decor} d-flex justify-content-center align-items-center align-self-center mb-5`}
    >
      <div className={styles.splashInfo}></div>
      <div className={styles.splashPicContainer}></div>
    </div>
  )
}

export default Hero
