import React from 'react'
import { Card, Alert, Table } from 'react-bootstrap'
import styles from './clv.module.css'
import { formatDate, daysRemaining } from '../../Utils'
import Loader from '../common/Loader'

const ChallengeEntry = ({ contest, handleChallengeClick }) => {
  const notStarted = daysRemaining(contest.featuredAt) < 0 ? false : true

  return (
    <tr
      key={contest.objectId}
      className={styles.tr}
      onClick={() => handleChallengeClick(contest)}
    >
      <td className="text-center">
        <img
          src={
            contest.thumbImageFile && contest.thumbImageFile.url
              ? contest.thumbImageFile.url
              : ''
          }
          className={styles.tmg}
          alt={contest.title}
        />
      </td>
      <td>
        <h5>{contest.title}</h5>
      </td>
      {contest.status === 'active' ? (
        <>
          {notStarted ? (
            <>
              <td>Starting in: {daysRemaining(contest.expiresAt)} days</td>
              <td className="text-info">Ready</td>
            </>
          ) : (
            <>
              <td>Ending in: {daysRemaining(contest.expiresAt)} days</td>
              <td className="text-success">Live</td>
            </>
          )}
        </>
      ) : (
        <>
          <td>{formatDate(contest.expiresAt)}</td>
          <td className="text-danger">Ended</td>
        </>
      )}
    </tr>
  )
}

const ChallengesListView = props => {
  const { loading, data, handleChallengeClick } = props

  if (loading) {
    return <Loader/>
  }

  if ((data || {}).error) {
    const { error } = (data || {}).error
    return <Alert variant="danger">{error}</Alert>
  }

  const { designContests } = data.result

  return (
    <div className="p-4">
      <Card className="rounded mb-3">
        <Card.Body className="p-0">
          <Table
            hover
            bordered
            variant="light"
            className={`${styles.ts} rounded`}
          >
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Date/Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {designContests.map(contest => (
                <ChallengeEntry
                  key={contest.objectId}
                  contest={contest}
                  handleChallengeClick={handleChallengeClick}
                />
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  )
}
/*

*/
export default ChallengesListView
