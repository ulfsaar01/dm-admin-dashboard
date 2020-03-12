import React from 'react'
import { Card, Alert, Table } from 'react-bootstrap'
import Loader from '../common/Loader'

const BadgeEntry = ({ badge, handleClick }) => {
  return (
    <tr
      key={badge.objectId}
      className="pointer"
      onClick={() => handleClick(badge)}
    >
      <td className="text-center">
        <img
          src={badge.imageFiles[badge.imageFiles.length - 1].url}
          alt={badge.title}
          width="100" height="100"
        />
      </td>
      <td>
        <h5>{badge.title}</h5>
      </td>

      
  <td className="text-info">{badge.type}</td>
  {badge.status === 'active' ? (
        <td className="text-success">Live</td>
      ) : (
        <td className="text-danger">Inactive</td>
      )}
    </tr>
  )
}

const BadgesListView = props => {
  const { loading, data, handleClick } = props

  if (loading) {
    return <Loader />
  }

  if ((data || {}).error) {
    const { error } = (data || {}).error
    return <Alert variant="danger">{error}</Alert>
  }

  const { badges } = data

  console.log(badges)

  return (
    <div className="p-4">
      <Card className="rounded mb-3">
        <Card.Body className="p-0">
          <Table
            hover
            bordered
            variant="light"
            className="rounded"
          >
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {badges.map(badge => (
                <BadgeEntry
                  key={badge.objectId}
                  badge={badge}
                  handleClick={handleClick}
                />
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  )
}

export default BadgesListView
