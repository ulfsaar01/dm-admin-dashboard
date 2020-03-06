import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Navbar, Dropdown } from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../assets/dm-admin-logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { logout as logoutAction} from '../../redux/actions/AuthActions'
import styles from './tn.module.css'

const TopNav = props => {
  const { toggleVertNav } = props
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const [showMenu, setShowMenu] = useState(false)

  const logout = () => {
    console.log("#$#$#$#$")
    dispatch(logoutAction(history))
  }

  return (
    <Navbar bg="dark" variant="dark" fixed="top" className="justify-content-between p-1">
      <button className={`${styles.bl} ${styles.mn} ml-2`} onClick={toggleVertNav}>
        <FontAwesomeIcon icon="bars" color="white" size="1x"/>
      </button>
      <Navbar.Brand href="#home" className="pl-2 m-0">
        <Link to="console">
          <Logo height="26" width="180" className="d-block p-0 m-0"/>
        </Link>
      </Navbar.Brand>
      <button className={`${showMenu ? styles.blf : ''} ${styles.bl}`} onClick={logout}>
        {user && user.cfTbImageUrl ? (
          <div className={styles.pfbi} style={{ 'backgroundImage': `url(${user.cfTbImageUrl})` }}></div>
        ) : (
          <div className={styles.pfbi}></div>
        )}
      </button>
    </Navbar>
  )
}

export default TopNav
