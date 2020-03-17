import React, { useState, useEffect } from 'react'
import ChallengesListView from '../components/challenges/ChallengesListView'
import ChallengesGridView from '../components/challenges/ChallengesGridView'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { challenges as challengesAction } from '../redux/actions/ChallengeActions'
import { badges as badgesAction } from '../redux/actions/BadgeActions'
import { useLocation } from 'react-router-dom'
import Hero from '../components/hero/HeroSection'
import { ReactComponent as Lamp } from '../assets/037-lamp-1.svg'

const defaultChallenge = {
  contest: {
    objectId: '',
    title: '',
    status: '',
    categoryId: '',
    type: 'Design',
    requirement: '',
    guidelines: '',
    guidelinesShort: '',
    likesRequired: 0,
    coinReward: 0,
    featuredAt: '',
    reward: '',
    buttons: '',
    thumbImageFile: '',
    backdropImageFile: '',
    contestImageFile: ''
  }
}

const Challenges = props => {
  const { pathname } = useLocation()
  const history = useHistory()
  const [isGridView, setGridView] = useState(true)

  const dispatch = useDispatch()
  const { data: badges } = useSelector(state => state.badges)
  const { data, error, loading } = useSelector(state => state.challenges)

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(challengesAction())
    dispatch(badgesAction())
  }, [dispatch, pathname])

  const toggleListView = () => {
    setGridView(false)
  }

  const toggleGridView = () => {
    setGridView(true)
  }

  const handleNewClick = contest => {
    const pathname = `/challenges/new`
    history.push(pathname, { contest: defaultChallenge, badges: badges })
  }

  const handleChallengeClick = contest => {
    const pathname = `/challenges/${(contest || {}).objectId}`
    history.push(pathname, { contest: contest, badges: badges })
  }

  return (
    <>
      <Hero
        sticker={Lamp}
        title="Challenges"
        createTitle="Create Challenge"
        styling="sky"
        isGridView={isGridView}
        toggleListView={toggleListView}
        toggleGridView={toggleGridView}
        handleNewClick={handleNewClick}
      />

      {isGridView ? (
        <ChallengesGridView
          loading={loading}
          data={data}
          error={error}
          handleChallengeClick={handleChallengeClick}
        />
      ) : (
        <ChallengesListView
          loading={loading}
          data={data}
          error={error}
          handleChallengeClick={handleChallengeClick}
        />
      )}
    </>
  )
}

export default Challenges
