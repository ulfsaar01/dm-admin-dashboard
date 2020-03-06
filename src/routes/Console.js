import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import TopNav from '../components/nav/TopNav'
import VerticalNav from '../components/nav/VerticalNav'
import Container from '../components/container/Container'
import styles from './co.module.css'
import Challenges from './Challenges'
import Dashboard from './Dashboard'

const Console = () => {
  const [isActive, setIsActive] = useState(true)
  const [animate, setAnimate] = useState(true)

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
/*
    const startingWidth = window.innerWidth;
    if(startingWidth < 768) {
      setIsActive(false)
    }
*/
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  },[isActive])

  const toggleVertNav = () => {
    setIsActive(!isActive)
  }

  return (
    <>
      <TopNav toggleVertNav={toggleVertNav}/>
      <VerticalNav isActive={isActive} animate={animate}/>
      <Container isActive={isActive} toggleVertNav={toggleVertNav}>
        <Switch>
          <Route exact path="/console" component={Dashboard} />
          <Route exact path="/challenges" component={() => <Challenges isActive={isActive} />}/>
        </Switch>
      </Container>
      
    </>
  )
}

export default Console
