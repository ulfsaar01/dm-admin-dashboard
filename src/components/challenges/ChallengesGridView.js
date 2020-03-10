import React from 'react'
import { Alert, Card } from 'react-bootstrap'
import styles from './cgv.module.css'
import { formatDate } from '../../Utils'

const ChallengeCard = ({ contest, handleChallengeClick }) => {
  return (
    <Card
      className={`${styles.card} m-2`}
      onClick={() => handleChallengeClick(contest)}
    >
      <Card.Img variant="top" src={(contest.thumbImageFile && contest.thumbImageFile.url) ? contest.thumbImageFile.url : ''} />
      <Card.Body>
        <Card.Title>{contest.title}</Card.Title>
        <Card.Subtitle
          className={`${
            contest.status === 'closed' ? 'text-danger' : 'text-success'
          } mb-2`}
        >
          {contest.status}
        </Card.Subtitle>
        <Card.Text>
          {formatDate(contest.featuredAt)}
          {formatDate(contest.expiresAt)}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
const ChallengesGridView = props => {
  const { loading, data, handleChallengeClick } = props

  if (loading) {
    return <Alert variant="primary">Loading</Alert>
  }

  if ((data || {}).error) {
    const { error } = (data || {}).error
    return <Alert variant="danger">{error}</Alert>
  }

  const { designContests } = data.result

  return (
    <div
      className="d-inline-flex flex-row justify-content-start 
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
