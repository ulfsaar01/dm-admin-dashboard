import React, { useState } from 'react'
import { Navbar } from 'react-bootstrap'
import { ReactComponent as Logo } from '../../assets/dm-logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import styles from './tn.module.css'

const TopNav = props => {
  const { toggleVertNav } = props
  const user = useSelector(state => state.auth.user)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const [showMenu, setShowMenu] = useState(false)

  return (
    <>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="#home">
          <Logo />
        </Navbar.Brand>
        
        <div className="w-100">
          <button className={`${styles.bl} float-left`} onClick={toggleVertNav}>
            <FontAwesomeIcon icon="bars" color="white" size="lg"/>
          </button>
          <button className={`${showMenu ? styles.blf : ''} ${styles.bl} float-right`}>
            {user && user.cfTbImageUrl ? (
              <div className={styles.pfbi} style={{ 'backgroundImage': `url(${user.cfTbImageUrl})` }}></div>
            ) : (
              <div className={styles.pfbi}></div>
            )}
          </button>
        </div>
      </Navbar>
    </>
  )
}

export default TopNav
