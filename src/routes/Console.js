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
//import ViewControls from '../components/common/ViewControls'
import ChallengesForm from './ChallengesDetail'
import styles from './co.module.css'

const Console = () => {
  const [isActive, setIsActive] = useState(true)
  const { isProd } = useSelector(state => state.env)

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

  //<TopNav toggleVertNav={toggleVertNav} toggleListView={toggleListView} toggleGridView={toggleGridView}/>
  //<ViewControls toggleListView={toggleListView} toggleGridView={toggleGridView}/>
  return (
    <>
      { isProd ? <div className={styles.prodbar} /> : null}
      
      <TopNav toggleVertNav={toggleVertNav} isActive={isActive} />
      <VerticalNav isActive={isActive} />
      <Container isActive={isActive} toggleVertNav={toggleVertNav}>
        <Switch>
          <Route exact path="/console" component={Dashboard} />
          <Route exact path="/challenges" component={Challenges}/>
          <Route exact path="/challenges/:id" component={ChallengesForm} />
          <Route exact path="/badges" component={Badges}/>
          <Route exact path="/blogs" component={Blogs} />
        </Switch>
      </Container>
    </>
  )
}

export default Console
