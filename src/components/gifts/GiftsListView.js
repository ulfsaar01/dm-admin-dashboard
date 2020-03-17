import React from 'react'
import { Card, Alert, Table } from 'react-bootstrap'
import Loader from '../common/Loader'

const GiftEntry = ({ gift, handleClick }) => {
  return (
    <tr
      key={gift.objectId}
      className="pointer"
      onClick={() => handleClick(gift)}
    >
      <td className="text-center">
        <img
          src={gift.gifUrl}
          alt={gift.title}
          width="100" height="100"
        />
      </td>
      <td>
        <h5>{gift.title}</h5>
      </td>

      
  <td className="text-info">{gift.numCoins}</td>
  {gift.status === 'active' ? (
        <td className="text-success">Live</td>
      ) : (
        <td className="text-danger">Inactive</td>
      )}
    </tr>
  )
}

const GiftsListView = props => {
  const { loading, data, handleClick } = props

  if (loading) {
    return <Loader />
  }

  if ((data || {}).error) {
    const { error } = (data || {}).error
    return <Alert variant="danger">{error}</Alert>
  }

  const { virtualGifts } = data

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
                <th>Coins</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {virtualGifts.map(gift => (
                <GiftEntry
                  key={gift.objectId}
                  gift={gift}
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

export default GiftsListView
