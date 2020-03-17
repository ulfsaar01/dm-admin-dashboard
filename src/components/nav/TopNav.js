import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Navbar } from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../assets/dm-admin-logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { logout as logoutAction } from '../../redux/actions/AuthActions'
import styles from './tn.module.css'

const TopNav = props => {
  const { toggleVertNav, isActive } = props
  const [isSticky, setSticky] = useState(true)
  const history = useHistory()
  const dispatch = useDispatch()

  const handleScroll = () => {
    setSticky(window.pageYOffset === 0)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', () => handleScroll)
    }
  }, [])

  const logout = () => {
    dispatch(logoutAction(history))
  }

  return (
    <Navbar
      fixed="top"
      className={`${isActive ? styles.navActive : styles.nav}
      ${isSticky ? styles.navClear : styles.navSolid}
      ${styles.navTrans} justify-content-between p-2`}
    >
      <button
        className={`${styles.bl} ${styles.mn} ml-2`}
        onClick={toggleVertNav}
      >
        <FontAwesomeIcon
          icon="bars"
          color={`${isSticky ? '#FFFFFF' : '#6c757d'}`}
          size="lg"
        />
      </button>
      <Navbar.Brand className="pl-2 m-0">
        <Link to="console">
          <Logo
            height="26"
            width="180"
            className="d-block p-0 m-0"
            fill={`${isSticky ? '#FFFFFF' : '#ff5e6d'}`}
          />
        </Link>
      </Navbar.Brand>
      <button className={`${styles.bl}`} onClick={logout} alt="Log Out">
        <FontAwesomeIcon
          icon="sign-out-alt"
          color={`${isSticky ? '#FFFFFF' : '#6c757d'}`}
          size="lg"
        />
      </button>
    </Navbar>
  )
}

export default TopNav
