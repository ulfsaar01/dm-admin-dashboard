import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import TopNav from '../components/nav/TopNav'
import VerticalNav from '../components/nav/VerticalNav'
import Container from '../components/container/Container'
import styles from './co.module.css'

const Console = () => {
  const [isActive, setIsActive] = useState(true)

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  const toggleVertNav = () => {
    setIsActive(!isActive)
  }

  return (
    <>
      <TopNav toggleVertNav={toggleVertNav}/>
      <VerticalNav isActive={isActive}/>
      <Container isActive={isActive} toggleVertNav={toggleVertNav}>sdfdsfdsfdsf</Container>
    </>
  )
}

export default Console
