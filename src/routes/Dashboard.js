import React from 'react'
import { useHistory } from 'react-router-dom'
import { CardColumns, Card } from 'react-bootstrap'
import Hero from '../components/hero/HeroDash'
import styles from './co.module.css'
import { ReactComponent as Plant } from '../assets/039-plant.svg'
import { ReactComponent as Flower } from '../assets/047-flower.svg'
import { ReactComponent as Lamp } from '../assets/037-lamp-1.svg'

const Dashboard = () => {
  const history = useHistory()

  const handleChallengeClick = () => {
    history.push('/challenges')
  }

  const handleBadgeClick = () => {
    history.push('/badges')
  }

  const handleGiftClick = () => {
    history.push('/gifts')
  }

  return (
    <div>
      <Hero />
      <CardColumns className={` m-3`}>
        <Card className={`${styles.dashCard} text-center`} onClick={handleChallengeClick}>
          <Card.Body
            className={`${styles.dashCardSplash} sky text-white`}
          ><Lamp /></Card.Body>
          <Card.Footer className="skysolid">
            <h3 className="text-white m-0 p-0">Challenges</h3>
          </Card.Footer>
        </Card>
        <Card className={`${styles.dashCard} text-center`} onClick={handleBadgeClick}>
          <Card.Body
            className={`${styles.dashCardSplash} gold text-white`}
          ><Flower /></Card.Body>
          <Card.Footer className="goldsolid">
            <h3 className="text-white m-0 p-0">Badges</h3>
          </Card.Footer>
        </Card>
        <Card className={`${styles.dashCard} text-center`} onClick={handleGiftClick}>
          <Card.Body
            className={`${styles.dashCardSplash} violet text-white`}
          ><Plant /></Card.Body>
          <Card.Footer className="violetsolid">
            <h3 className="text-white m-0 p-0">Virtual Gifts</h3>
          </Card.Footer>
        </Card>
      </CardColumns>
    </div>
  )
}

export default Dashboard
