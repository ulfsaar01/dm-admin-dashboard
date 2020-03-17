import React from 'react'
import { CardColumns, Card, Alert } from 'react-bootstrap'
import styles from './ggv.module.css'
import Loader from '../common/Loader'

const GiftCard = ({ gift, handleClick }) => {
  return (
    <Card className={styles.card}
    onClick={() => handleClick(gift)}>
      <Card.Img variant="top" src={gift.gifUrl} />
      <Card.Footer className="text-center font-weight-bold">
        {gift.title}
      </Card.Footer>
    </Card>
  )
}

const GiftsGridView = props => {
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
    <CardColumns className={`${styles.cardcolumns} m-3`}>
      {virtualGifts.map(gift => (
        <GiftCard
          key={gift.objectId}
          gift={gift}
          handleClick={handleClick}
        />
      ))}
    </CardColumns>
  )
}

export default GiftsGridView
/* <div
className="d-inline-flex flex-row justify-content-center 
flex-wrap p-4"
>
*/