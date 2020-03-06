import React from 'react'
import { Alert, Table } from 'react-bootstrap'
import styles from './clv.module.css'
import { formatDate } from '../../Utils'

const ChallengesListView = props => {
  const { loading, data } = props

  if (loading) {
    return <Alert variant="primary">Loading</Alert>
  }

  if ((data || {}).error) {
    const { error } = (data || {}).error
    return <Alert variant="danger">{error}</Alert>
  }

  const { designContests } = data.result;

  return (
    <Table hover bordered variant="light" className={styles.ts}>
      <thead>
        <tr>
          <th></th>
          <th>Title</th>
          <th>Feature Date</th>
          <th>Expire Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {designContests.map(contest => (
          <tr key={contest.objectId}>
            <td><img src={contest.thumbImageFile.url} className={styles.tmg} alt={contest.title}/></td>
            <td>{contest.title}</td>
            <td>{formatDate(contest.featuredAt)}</td>
            <td>{formatDate(contest.expiresAt)}</td>
            <td className={`${contest.status === 'closed' ? 'text-danger' : 'text-success'}`}>{contest.status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default ChallengesListView
