import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container, Row, Col, CardColumns, Card } from 'react-bootstrap'
import UIRecentWidget from '../components/userinspiration/UIRecentWidget'
import styles from './co.module.css'
import { ReactComponent as Plant } from '../assets/039-plant.svg'
import { ReactComponent as Flower } from '../assets/047-flower.svg'
import { ReactComponent as Lamp } from '../assets/037-lamp-1.svg'

const Dashboard = () => {
  const { isLimited } = useSelector(state => state.auth)
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
    <div className={styles.mainContainer}>
      <div className={`${styles.heroDashboard} decor`} />
      <div className={styles.contentDashboard}>
        <Container>
          <Row className="justify-content-md-center">
            <Col md={12}>
              <h2 className="text-white mb-5">DecorMatters-Dev</h2>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md={12}>
              <UIRecentWidget />
            </Col>
          </Row>
        </Container>
        <CardColumns className={` m-3`}>
          <Card
            className={`${styles.dashCard} text-center`}
            onClick={handleChallengeClick}
          >
            <Card.Body className={`${styles.dashCardSplash} sky text-white`}>
              <Lamp />
            </Card.Body>
            <Card.Footer className="skysolid">
              <h3 className="text-white m-0 p-0">Challenges</h3>
            </Card.Footer>
          </Card>
          {isLimited === true ? null : (
            <>
              <Card
                className={`${styles.dashCard} text-center`}
                onClick={handleBadgeClick}
              >
                <Card.Body
                  className={`${styles.dashCardSplash} gold text-white`}
                >
                  <Flower />
                </Card.Body>
                <Card.Footer className="goldsolid">
                  <h3 className="text-white m-0 p-0">Badges</h3>
                </Card.Footer>
              </Card>
              <Card
                className={`${styles.dashCard} text-center`}
                onClick={handleGiftClick}
              >
                <Card.Body
                  className={`${styles.dashCardSplash} violet text-white`}
                >
                  <Plant />
                </Card.Body>
                <Card.Footer className="violetsolid">
                  <h3 className="text-white m-0 p-0">Virtual Gifts</h3>
                </Card.Footer>
              </Card>
            </>
          )}
        </CardColumns>
      </div>
    </div>
  )
}

export default Dashboard
