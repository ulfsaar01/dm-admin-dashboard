import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import TopNav from '../components/nav/TopNav'
import VerticalNav from '../components/nav/VerticalNav'
import Container from '../components/container/Container'
import Challenges from './Challenges'
import Dashboard from './Dashboard'
import Blogs from './Blogs'
import Badges from './Badges'
import Gifts from './Gifts'
//import ViewControls from '../components/common/ViewControls'
import ChallengeDetail from './ChallengeDetail'
import GiftDetail from './GiftDetail'
import Login from './Login'
import styles from './co.module.css'
import { isProd } from '../data/envStorage.js'

const Console = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    function getSize() {
      return {
        width: window.innerWidth
      }
    }

    function handleResize() {
      if (isActive === false) {
        if (getSize().width >= 768) {
          setIsActive(true)
        }
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isActive])

  const toggleVertNav = () => {
    setIsActive(!isActive)
  }

  if (isAuthenticated) {
    return (
      <>
        {isProd() === 'true' ? <div className={styles.prodbar} /> : null}
        <TopNav toggleVertNav={toggleVertNav} isActive={isActive} />
        <VerticalNav isActive={isActive} />
        <Container isActive={isActive} toggleVertNav={toggleVertNav}>
          <Switch>
            <Route exact path="/challenges" component={Challenges} />
            <Route exact path="/challenges/:id" component={ChallengeDetail} />
            <Route exact path="/badges" component={Badges} />
            <Route exact path="/gifts" component={Gifts} />
            <Route exact path="/gifts/:id" component={GiftDetail} />
            <Route exact path="/blogs" component={Blogs} />
            <Route component={Dashboard} />
          </Switch>
        </Container>
      </>
    )
  }
  return <Login />
}

export default Console
