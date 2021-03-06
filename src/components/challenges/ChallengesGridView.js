import React from 'react'
import { CardColumns, Alert, Card } from 'react-bootstrap'
import styles from './cgv.module.css'
import { formatDate, daysRemaining } from '../../Utils'
import Loader from '../common/Loader'

const ChallengeCard = ({ contest, refFn, handleChallengeClick }) => {
  //const notStarted = daysRemaining(contest.featuredAt) < 0 ? false : true

  return (
    <Card
      ref={refFn}
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
            <Card.Subtitle className="text-success m-0">Live/Ready</Card.Subtitle>
            <p className="m-0">{formatDate(contest.featuredAt)}</p>
            <p className="m-0">{formatDate(contest.expiresAt)}</p>
          </>
        ) : (
          <>
            <Card.Subtitle className="text-danger m-0">Ended</Card.Subtitle>
            <p className="m-0">{formatDate(contest.featuredAt)}</p>
            <p className="m-0">{formatDate(contest.expiresAt)}</p>
          </>
        )}
      </Card.Body>
    </Card>
  )
}

const ChallengesGridView = props => {
  const { loading, data, refFn, handleChallengeClick } = props

  if (loading) {
    return <Loader />
  }

  if ((data || {}).error) {
    const { error } = (data || {}).error
    return <Alert variant="danger">{error}</Alert>
  }

  //const { designContests } = data.result

  return (
    <div className="d-flex flex-row justify-content-start align-items-start align-self-start flex-wrap">
      {data.map(contest => (
        <ChallengeCard
          key={contest.objectId}
          contest={contest}
          handleChallengeClick={handleChallengeClick}
          refFn={refFn}
        />
      ))}
    </div>
  )
}

export default ChallengesGridView
