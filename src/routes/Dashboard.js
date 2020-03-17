import React from 'react'
import { useHistory } from 'react-router-dom'
import { CardDeck, Card } from 'react-bootstrap'
import Hero from '../components/hero/HeroDash'
import styles from './co.module.css'
import { ReactComponent as Plant } from '../assets/039-plant.svg'
import { ReactComponent as Flower } from '../assets/047-flower.svg'
//import { ReactComponent as Lamp } from '../assets/037-lamp-1.svg'

const Dashboard = () => {
  const history = useHistory()

  const handleChallengeClick = () => {
    history.push('/challenges')
  }

  const handleBadgeClick = () => {
    history.push('/badges')
  }

  return (
    <div>
      <Hero />
      <CardDeck className={styles.wrap}>
        <Card
          className={`${styles.dashCard} decor text-white`}
          onClick={handleChallengeClick}
        >
          <Plant />
          <Card.ImgOverlay
            className="d-flex flex-row 
    justify-content-center align-items-center align-self-center "
          >
            <h1>Challenges</h1>
          </Card.ImgOverlay>
        </Card>
        <Card
          className={`${styles.dashCard} gold text-white`}
          onClick={handleBadgeClick}
        >
          <Flower />
          <Card.ImgOverlay
            className="d-flex flex-row 
    justify-content-center align-items-center align-self-center "
          >
            <h1>Badges</h1>
          </Card.ImgOverlay>
        </Card>
      </CardDeck>
    </div>
  )
}

export default Dashboard
