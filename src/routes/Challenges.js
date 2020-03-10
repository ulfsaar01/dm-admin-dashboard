import React, { useState, useEffect } from 'react'
import ChallengesListView from '../components/challenges/ChallengesListView'
import ChallengesGridView from '../components/challenges/ChallengesGridView'
import styles from './co.module.css'
import { Button, ButtonGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { challenges as challengesAction} from '../redux/actions/ChallengeActions'
import { badges as badgesAction} from '../redux/actions/BadgeActions'
import { useLocation } from "react-router-dom";

const Challenges = props => {
  const { pathname } = useLocation();
  const history = useHistory()
  const [isGridView, setGridView] = useState(true)

  const dispatch = useDispatch()
  const { data:badges} = useSelector(state => state.badges)
  const { data, error, loading } = useSelector(state => state.challenges)

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(challengesAction())
    dispatch(badgesAction())
  }, [dispatch, pathname])

  const toggleListView = () => {
    setGridView(false)
  }

  const toggleGridView = () => {
    setGridView(true)
  }
  
  const handleChallengeClick = (contest) => {
    const pathname = `/challenges/${
      (contest || {}).objectId
    }`;
    history.push(pathname, { contest: contest, badges:badges })
  }

  //console.log(badges)
/*
  const result = useFetch("getDesignContests3");
  const data = result.data;
  const loading = result.loading;
*/
  return (
    <div className={styles.wrap}>
      <div className="d-flex mb-3 justify-content-center">
        <ButtonGroup aria-label="Basic example">
          <Button variant="secondary" onClick={toggleListView}><FontAwesomeIcon icon="list" size="1x"/></Button>
          <Button variant="secondary" onClick={toggleGridView}><FontAwesomeIcon icon="th-large" size="1x"/></Button>
        </ButtonGroup>
      </div>
      {(isGridView) ? (
        <ChallengesGridView loading={loading} data={data} error={error} handleChallengeClick={handleChallengeClick}/>
      ) : (
        <ChallengesListView loading={loading} data={data} error={error} handleChallengeClick={handleChallengeClick}/>
      )}
    </div>
  )
}

export default Challenges
