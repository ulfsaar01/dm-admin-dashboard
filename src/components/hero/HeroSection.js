import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card } from 'react-bootstrap'
import styles from './he.module.css'
import { CreateAltButton } from '../../components/common/FormControls'
//import { ReactComponent as Couch } from '../assets/038-couch.svg'
import { ReactComponent as Plant } from '../../assets/039-plant.svg'
//import { ReactComponent as Paint } from '../assets/003-paint-bucket.svg'

const Hero = props => {
  const {
    sticker,
    styling,
    title,
    createTitle,
    isGridView,
    handleNewClick,
    toggleGridView,
    toggleListView
  } = props

  const Stick = sticker ? sticker:Plant

  return (
    <div
      className={`${styles.splash} ${styling} d-flex justify-content-center align-items-center align-self-center mb-5`}
    >
      <div className={styles.splashInfo}>
        <h1 className="mb-4 text-white">{title}</h1>
        <CreateAltButton onClick={handleNewClick}>
          {createTitle}
        </CreateAltButton>
      </div>
      <div className={styles.splashPicContainer}>
        <Stick className={styles.splashPic} />
      </div>

      <div className={styles.options}>
        <div className="justify-content-md-center">
          <Card className="rounded shadow-sm">
            <Card.Body className="p-0 text-center">
              <button className={styles.optionBtn} onClick={toggleGridView}>
                <FontAwesomeIcon
                  icon="th-large"
                  size="lg"
                  className={`${isGridView ? styles.optionSelected : ''} ${
                    styles.optionBtnIcon
                  }`}
                />
              </button>
              <button className={styles.optionBtn} onClick={toggleListView}>
                <FontAwesomeIcon
                  icon="list"
                  size="lg"
                  className={`${!isGridView ? styles.optionSelected : ''} ${
                    styles.optionBtnIcon
                  }`}
                />
              </button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Hero
