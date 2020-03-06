import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import TopNav from '../components/nav/TopNav'
import VerticalNav from '../components/nav/VerticalNav'
import Container from '../components/container/Container'
import Challenges from './Challenges'
import Dashboard from './Dashboard'
import ViewControls from '../components/common/ViewControls'
import ChallengesForm from './ChallengesDetail'

const Console = () => {
  const [isActive, setIsActive] = useState(true)
  const [isGridView, setGridView] = useState(true)

  useEffect(() => {
    function getSize() {
      return {
        width: window.innerWidth
      };
    }

    function handleResize() {
      if(isActive === false) {
        if(getSize().width >= 768) {
          setIsActive(true)
        }
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  },[isActive])

  const toggleVertNav = () => {
    setIsActive(!isActive)
  }

  const toggleListView = () => {
    setGridView(false)
  }

  const toggleGridView = () => {
    setGridView(true)
  }

  return (
    <>
      <TopNav toggleVertNav={toggleVertNav} toggleListView={toggleListView} toggleGridView={toggleGridView}/>
      <ViewControls toggleListView={toggleListView} toggleGridView={toggleGridView}/>
      <VerticalNav isActive={isActive}/>
      <Container isActive={isActive} toggleVertNav={toggleVertNav}>
        <Switch>
          <Route exact path="/console" component={Dashboard} />
          <Route exact path="/challenges" component={() => <Challenges isGridView={isGridView} />}/>
          <Route exact path="/challenges/:id" component={ChallengesForm} />
        </Switch>
      </Container>
      
    </>
  )
}

export default Console
