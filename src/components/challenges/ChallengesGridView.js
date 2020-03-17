import React from 'react'
import { Alert, Card } from 'react-bootstrap'
import styles from './cgv.module.css'
import { formatDate, daysRemaining } from '../../Utils'
import Loader from '../common/Loader'

const ChallengeCard = ({ contest, handleChallengeClick }) => {
  const notStarted = daysRemaining(contest.featuredAt) < 0 ? false : true

  return (
    <Card
      className={`${styles.card} m-2`}
      onClick={() => handleChallengeClick(contest)}
    >
      <Card.Img
        variant="top"
        src={
          contest.thumbImageFile && contest.thumbImageFile.url
            ? contest.thumbImageFile.url
            : ''
        }
      />
      <Card.Body>
        <Card.Title>{contest.title}</Card.Title>
        {contest.status === 'active' ? (
          <>
            {notStarted ? (
              <>
                <Card.Subtitle className="text-info m-0">Ready</Card.Subtitle>
                <p className="m-0">
                  Starting in: {daysRemaining(contest.expiresAt)} days
                </p>
              </>
            ) : (
              <>
                <Card.Subtitle className="text-success m-0">Live</Card.Subtitle>
                <p className="m-0">
                  Ending in: {daysRemaining(contest.expiresAt)} days
                </p>
              </>
            )}
          </>
        ) : (
          <>
            <Card.Subtitle className="text-danger m-0">Ended</Card.Subtitle>
            <p className="m-0">{formatDate(contest.expiresAt)}</p>
          </>
        )}
      </Card.Body>
    </Card>
  )
}

const ChallengesGridView = props => {
  const { loading, data, handleChallengeClick } = props

  if (loading) {
    return <Loader />
  }

  if ((data || {}).error) {
    const { error } = (data || {}).error
    return <Alert variant="danger">{error}</Alert>
  }

  const { designContests } = data.result

  return (
    <div
      className="d-inline-flex flex-row justify-content-center 
    flex-wrap"
    >
      {designContests.map(contest => (
        <ChallengeCard
          key={contest.objectId}
          contest={contest}
          handleChallengeClick={handleChallengeClick}
        />
      ))}
    </div>
  )
}

export default ChallengesGridView
