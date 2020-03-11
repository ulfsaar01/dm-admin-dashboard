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
    <div>
      <div
        className={`${styles.splash} bg-primary d-flex justify-content-center align-items-center align-self-center`}
      >
        <div>
          <h1 className="mb-4 text-white">Challenges</h1>
          <CreateAltButton onClick={handleNewChallengeClick}>
            Create Challenge
          </CreateAltButton>
        </div>
        <Container className={styles.options}>
          <Row className="justify-content-md-center">
            <Col md={6}>
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
            </Col>
          </Row>
        </Container>
      </div>
      <div className="d-flex mt-5 mb-3 justify-content-center"></div>
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
    </div>
  )
}

export default Challenges
