import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './vn.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'

const VerticalNav = () => {
  const user = useSelector(state => state.auth.user)

  return (
    <div className={`${styles.sidebar} ${styles.verticalnav}`} id="sidebar">
      <div>
        {user && user.cfTbImageUrl ? (
          <div className="text-center mb-4">
            <img
              src={user.cfTbImageUrl}
              className={styles.profile}
              width="65"
              heigh="65"
              alt="profile pic"
            />
            <p className="pt-2 color-dm-grey font-weight-bold">
              {user.username}
            </p>
          </div>
        ) : (
          <div className={styles.pfbi}></div>
        )}
      </div>
      <p className="pl-3 mb-0 color-dm-grey ">CREATE</p>
      <ul className="nav flex-column mb-0">
        <li className="nav-item">
          <NavLink
            to="/console"
            className="nav-link color-dm-grey"
            activeClassName="color-dm-pink"
          >
            <FontAwesomeIcon
              icon="home"
              size="1x"
              className="mr-2"
              fixedWidth
            />
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/products"
            className="nav-link color-dm-grey"
            activeClassName="color-dm-pink"
          >
            <FontAwesomeIcon
              icon="rocket"
              size="1x"
              className="mr-2"
              fixedWidth
            />
            Marketing Products
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/challenges"
            className="nav-link color-dm-grey"
            activeClassName="color-dm-pink"
          >
            <FontAwesomeIcon
              icon="crown"
              size="1x"
              className="mr-2"
              fixedWidth
            />
            Challenges
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/badges"
            className="nav-link color-dm-grey"
            activeClassName="color-dm-pink"
          >
            <FontAwesomeIcon
              icon="award"
              size="1x"
              className="mr-2"
              fixedWidth
            />
            Badges
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/magazine"
            className="nav-link color-dm-grey"
            activeClassName="color-dm-pink"
          >
            <FontAwesomeIcon
              icon="hippo"
              size="1x"
              className="mr-2"
              fixedWidth
            />
            Magazine
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/blogs"
            className="nav-link color-dm-grey"
            activeClassName="color-dm-pink"
          >
            <FontAwesomeIcon
              icon="book"
              size="1x"
              className="mr-2"
              fixedWidth
            />
            Blogs
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default VerticalNav
