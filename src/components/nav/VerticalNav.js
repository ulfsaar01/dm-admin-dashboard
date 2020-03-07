import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './vn.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const VerticalNav = () => {
  return (
    <div className={`${styles.sidebar} ${styles.verticalnav}`} id="sidebar">
      <ul className="nav flex-column mb-0">
        <li className="nav-item py-2">
          <NavLink to="/console" className="nav-link text-muted" activeClassName="text-dark">
            <FontAwesomeIcon icon="home" size="1x" className="mr-2"/>
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/products" className="nav-link text-muted" activeClassName="text-dark">
            <FontAwesomeIcon icon="rocket" size="1x" className="mr-2"/>
            Marketing Products
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/challenges" className="nav-link text-muted" activeClassName="text-dark">
            <FontAwesomeIcon icon="crown" size="1x" className="mr-2"/>
            Challenges
          </NavLink>
        </li>
        <li className="nav-item">
        <NavLink to="/badges" className="nav-link text-muted" activeClassName="text-dark">
            <FontAwesomeIcon icon="award" size="1x" className="mr-2"/>
            Badges
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/magazine" className="nav-link text-muted" activeClassName="text-dark">
            <FontAwesomeIcon icon="hippo" size="1x" className="mr-2"/>
            Magazine
          </NavLink>
        </li>
        
        <li className="nav-item">
          <NavLink to="/blogs" className="nav-link text-muted" activeClassName="text-dark">
            <FontAwesomeIcon icon="book" size="1x" className="mr-2"/>
            Blogs
          </NavLink>
        </li>
      </ul>
      </div>
  )
}

export default VerticalNav


