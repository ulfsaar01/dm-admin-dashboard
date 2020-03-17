import React, { useState, useEffect } from 'react'
import BadgesListView from '../components/badges/BadgesListView'
import BadgesGridView from '../components/badges/BadgesGridView'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { badges as badgesAction } from '../redux/actions/BadgeActions'
import { useLocation } from 'react-router-dom'
//import { ReactComponent as Couch } from '../assets/038-couch.svg'
//import { ReactComponent as Plant } from '../assets/039-plant.svg'
//import { ReactComponent as Fish } from '../assets/032-fishbowl.svg'
import Hero from '../components/hero/HeroSection'
import { ReactComponent as Flower } from '../assets/047-flower.svg'

const Badges = props => {
  const { pathname } = useLocation()
  const history = useHistory()
  const [isGridView, setGridView] = useState(true)

  const dispatch = useDispatch()
  const { data, error, loading } = useSelector(state => state.badges)

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(badgesAction())
  }, [dispatch, pathname])

  const toggleListView = () => {
    setGridView(false)
  }

  const toggleGridView = () => {
    setGridView(true)
  }

  const handleNewClick = contest => {
    const pathname = `/badges/new`
    //history.push(pathname, { contest: defaultChallenge, badges: badges })
  }

  const handleClick = contest => {
    //const pathname = `/challenges/${(contest || {}).objectId}`
    //history.push(pathname, { contest: contest, badges: badges })
  }

  return (
    <>
      <Hero
        sticker={Flower}
        title="Badges"
        createTitle="Create Badge"
        styling="gold"
        isGridView={isGridView}
        toggleListView={toggleListView}
        toggleGridView={toggleGridView}
        handleNewClick={handleNewClick}
      />

      {isGridView ? (
        <BadgesGridView
          loading={loading}
          data={data}
          error={error}
          handleClick={handleClick}
        />
      ) : (
        <BadgesListView
          loading={loading}
          data={data}
          error={error}
          handleClick={handleClick}
        />
      )}
    </>
  )
}

export default Badges
