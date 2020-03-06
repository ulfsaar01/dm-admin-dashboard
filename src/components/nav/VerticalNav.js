import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './vn.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const VerticalNav = () => {
//library.add(faBars, faPlus, faList, faThLarge, faHome, faFlagCheckered, faBook, faAward, faCrown, faFighterJet, faRocket, faFortAwesome)

  return (
    <div activeClassName={styles.active} className={`${styles.sidebar} ${styles.verticalnav}`} id="sidebar">
      <ul className="nav flex-column mb-0">
      <li className="nav-item">
        <NavLink exact to="/console">
          <FontAwesomeIcon icon="home" size="1x"/>
          Dashboard
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink exact to="/challenges">
          <FontAwesomeIcon icon="rocket" size="1x"/>
          Marketing Products
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink exact to="/challenges">
          <FontAwesomeIcon icon="crown" size="1x"/>
          Challenges
        </NavLink>
      </li>
      <li className="nav-item">
       <NavLink exact to="/challenges">
          <FontAwesomeIcon icon="award" size="1x"/>
          Badges
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink exact to="/challenges">
          <FontAwesomeIcon icon="hippo" size="1x"/>
          Magazine
        </NavLink>
      </li>
      
      <li className="nav-item">
        <NavLink exact to="/challenges">
          <FontAwesomeIcon icon="book" size="1x"/>
          Book
        </NavLink>
      </li>
      </ul>
      </div>
  )
}

export default VerticalNav


