import React from 'react'
import styles from './vn.module.css'

const VerticalNav = props => {
  const { isActive } = props

  return (
    <div className={`${isActive ? styles.sidebarActive : styles.sidebar} ${styles.verticalnav}`} id="sidebar">
      <ul className="nav flex-column mb-0">
      <li className="nav-item">
        <a href="#" className="nav-link text-light">
                  <i className="fa fa-th-large mr-3 text-primary fa-fw"></i>
                  Home
              </a>
      </li>
      <li className="nav-item">
        <a href="#" className="nav-link text-light">
                  <i className="fa fa-picture-o mr-3 text-primary fa-fw"></i>
                  Marketing Products
              </a>
      </li>
      <li className="nav-item">
        <a href="#" className="nav-link text-light">
                  <i className="fa fa-address-card mr-3 text-primary fa-fw"></i>
                  Challenges
              </a>
      </li>
      <li className="nav-item">
        <a href="#" className="nav-link text-light">
                  <i className="fa fa-cubes mr-3 text-primary fa-fw"></i>
                  Badges
              </a>
      </li>
      <li className="nav-item">
        <a href="#" className="nav-link text-light">
                  <i className="fa fa-picture-o mr-3 text-primary fa-fw"></i>
                  Magazines
              </a>
      </li>
      
      <li className="nav-item">
        <a href="#" className="nav-link text-light">
                  <i className="fa fa-picture-o mr-3 text-primary fa-fw"></i>
                  Blog
              </a>
      </li>
      </ul>
      </div>
  )
}

export default VerticalNav


