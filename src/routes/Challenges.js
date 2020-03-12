import React, { useState, useEffect } from 'react'
import ChallengesListView from '../components/challenges/ChallengesListView'
import ChallengesGridView from '../components/challenges/ChallengesGridView'
import styles from './co.module.css'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { challenges as challengesAction } from '../redux/actions/ChallengeActions'
import { badges as badgesAction } from '../redux/actions/BadgeActions'
import { useLocation } from 'react-router-dom'
import { CreateAltButton } from '../components/common/FormControls'
//import { ReactComponent as Couch } from '../assets/038-couch.svg'
import { ReactComponent as Plant } from '../assets/039-plant.svg'
//import { ReactComponent as Paint } from '../assets/003-paint-bucket.svg'

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

  const handleNewChallengeClick = contest => {
    const pathname = `/challenges/new`
    history.push(pathname, { contest: defaultChallenge, badges: badges })
  }

  const handleChallengeClick = contest => {
    const pathname = `/challenges/${(contest || {}).objectId}`
    history.push(pathname, { contest: contest, badges: badges })
  }

  return (
    <>
      <div
        className={`${styles.splash} d-flex justify-content-center align-items-center align-self-center mb-5`}
      >
          <div className={styles.splashInfo}>
            <h1 className="mb-4 text-white">Challenges</h1>
            <CreateAltButton onClick={handleNewChallengeClick}>
              Create Challenge
            </CreateAltButton>
          </div>
          <div className={styles.splashPicContainer}>
            <Plant className={styles.splashPic} />
          </div>
     
        <div className={styles.options}>
          <div className="justify-content-md-center">
            <Card className="rounded shadow-sm">
              <Card.Body className="p-0 text-center">
                <button className={styles.optionBtn} onClick={toggleGridView}>
                  <FontAwesomeIcon
                    icon="th-large"
                    size="lg"
                    className={`${isGridView ? styles.optionSelected : ''} ${
                      styles.optionBtnIcon
                    }`}
                  />
                </button>
                <button className={styles.optionBtn} onClick={toggleListView}>
                  <FontAwesomeIcon
                    icon="list"
                    size="lg"
                    className={`${!isGridView ? styles.optionSelected : ''} ${
                      styles.optionBtnIcon
                    }`}
                  />
                </button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    
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
