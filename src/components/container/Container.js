import React from 'react'
import styles from './co.module.css'

const Container = props => {
  const { isActive } = props

  return (
    <div className={`${isActive ? styles.contentActive : styles.content} ${styles.pagecontent}`} id="content">
       {props.children}
    </div>
  )
}

export default Container
