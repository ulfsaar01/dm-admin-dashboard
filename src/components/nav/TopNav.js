import React from 'react'
import { useDispatch } from 'react-redux'
import { Navbar } from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../assets/dm-admin-logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { logout as logoutAction } from '../../redux/actions/AuthActions'
import styles from './tn.module.css'

const TopNav = props => {
  const { toggleVertNav } = props
  const history = useHistory()
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(logoutAction(history))
  }

  return (
    <Navbar
      bg="light"
      variant="light"
      fixed="top"
      className="justify-content-between p-2 shadow-sm"
    >
      <button
        className={`${styles.bl} ${styles.mn} ml-2`}
        onClick={toggleVertNav}
      >
        <FontAwesomeIcon icon="bars" color="#6c757d" size="lg" />
      </button>
      <Navbar.Brand className="pl-2 m-0">
        <Link to="console">
          <Logo
            height="26"
            width="180"
            className="d-block p-0 m-0 color-dm-grey"
          />
        </Link>
      </Navbar.Brand>
      <button className={`${styles.bl}`} onClick={logout}>
        <FontAwesomeIcon icon="sign-out-alt" color="#6c757d" size="lg" />
      </button>
    </Navbar>
  )
}

export default TopNav
