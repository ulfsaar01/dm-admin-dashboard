import React from 'react'
import { Card, Alert } from 'react-bootstrap'
import styles from './bgv.module.css'
import Loader from '../common/Loader'

const BadgeCard = ({ badge, handleClick }) => {
  return (
    <Card className={styles.card}>
      <Card.Img src={badge.imageFiles[badge.imageFiles.length - 1].url} />
      <Card.Footer className="text-center font-weight-bold">
        {badge.title}
      </Card.Footer>
    </Card>
  )
}

const BadgesGridView = props => {
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
    <div
      className="d-inline-flex flex-row justify-content-center 
    flex-wrap p-4"
    >
      {badges.map(badge => (
        <BadgeCard
          key={badge.objectId}
          badge={badge}
          handleClick={handleClick}
        />
      ))}
    </div>
  )
}

export default BadgesGridView
