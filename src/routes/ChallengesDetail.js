import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Card } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DateTimePicker } from 'react-widgets'
import {
  DMInputGroup,
  DMSelectGroup,
  DMTextAreaGroup,
  DMNumberGroup,
  DMImageUploadGroup,
  BackLongButton,
  SubmitButton
} from '../components/common/FormControls'
import * as Yup from 'yup'
import moment from 'moment'
import { Formik } from 'formik'
import styles from './co.module.css'
import ERROR from '../constants/ValidationConstants'
import { api } from '../useFetch'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const categories = require('../data/category.json')

const categoriesOptions = categories.map(category => {
  return (
    <option key={category.Id} value={category.Id}>
      {category.shortName}
    </option>
  )
})

const challengeSchema = Yup.object().shape({
  title: Yup.string().required(ERROR.REQUIRE),
  requirement: Yup.string().required(ERROR.REQUIRE),
  guidelines: Yup.string().required(ERROR.REQUIRE),
  guidelinesShort: Yup.string().required(ERROR.REQUIRE),
  reward: Yup.string().required(ERROR.REQUIRE),
  buttons: Yup.string().required(ERROR.REQUIRE)
})

const ChallengesDetail = props => {
  /*
  const [state, setState] = useState({
    contest: {
      title: '',
      status: '',
      categoryId: '',
      type: 'Design',
      requirement: '',
      guidelines: '',
      guidelinesShort: '',
      likesRequired: 0,
      coinReward: 0,
      featuredAt: '',
      reward: '',
      buttons: '',
      thumbImageFile: '',
      backdropImageFile: '',
      contestImageFile: ''
    }
  })
  */

  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  const history = useHistory()
  const { contest, badges } = (props.location || {}).state || {}

  console.log(contest)
  const [thumbUrl, setThumbUrl] = useState((contest.thumbImageFile || {}).url)
  const [backdropUrl, setBackdropUrl] = useState(
    (contest.backdropImageFile || {}).url
  )
  const [contestUrl, setContestUrl] = useState(
    (contest.contestImageFile || {}).url
  )

  const [featuredAt, setFeaturedAt] = useState(
    new Date(moment((contest.featuredAt || {}).iso))
  )
  const [expiresAt, setExpiresAt] = useState(
    new Date(moment((contest.expiresAt || {}).iso))
  )

  var prevThumbUrl = contest.thumbImageFile
  var prevBackdropUrl = contest.backdropImageFile
  var prevContestUrl = contest.contestImageFile

  const badgeOptions = badges.badges.map(badge => {
    return (
      <option key={badge.objectId} value={badge.objectId}>
        {badge.title}
      </option>
    )
  })

  const goBack = () => {
    history.goBack()
  }

  const onUploadImage = (event, id) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      const reader = new FileReader()

      reader.onload = e => {
        switch (id) {
          case 'thumbImageFile': {
            return setThumbUrl(e.target.result)
          }
          case 'backdropImageFile': {
            return setBackdropUrl(e.target.result)
          }
          case 'contestImageFile': {
            return setContestUrl(e.target.result)
          }
          default:
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const resetImages = () => {
    setThumbUrl((prevThumbUrl || {}).url)
    setBackdropUrl((prevBackdropUrl || {}).url)
    setContestUrl((prevContestUrl || {}).url)
  }

  const prepareSubmission = values => {
    let {
      title,
      reward,
      requirement,
      guidelines,
      guidelinesShort,
      badgeId,
      categoryId,
      coinReward,
      likesRequired,
      type,
      numChallenges,
      seriesTitle,
      buttons
    } = values

    const designContestId = (contest || {}).objectId
    /*
    console.log(contestId)
    console.log(title)
    console.log(reward)
    console.log(requirement)
    console.log(guidelines)
    console.log(guidelinesShort)
    console.log(badgeId)
    console.log(categoryId)
    console.log(coinReward)
    console.log(likesRequired)
    console.log(type)
    console.log(numChallenges)
    console.log(seriesTitle)
    console.log(buttons)
    console.log(featuredAt)
    console.log(expiresAt)
    
    console.log(thumbUrl)
    console.log(backdropUrl)
    */
    const thumbImageData =
      thumbUrl && !thumbUrl.includes('http')
        ? {
            __type: 'Bytes',
            base64: thumbUrl
          }
        : undefined

    const backdropImageData =
      backdropUrl && !backdropUrl.includes('http')
        ? {
            __type: 'Bytes',
            base64: backdropUrl
          }
        : undefined

    const contestImageData =
      contestUrl && !contestUrl.includes('http')
        ? {
            __type: 'Bytes',
            base64: contestUrl
          }
        : undefined

    const body = JSON.stringify({
      title,
      designContestId,
      thumbImageData,
      backdropImageData,
      contestImageData,
      reward,
      requirement,
      guidelines,
      guidelinesShort,
      badgeId,
      categoryId,
      expiresAt,
      featuredAt,
      coinReward,
      likesRequired,
      type,
      numChallenges,
      seriesTitle,
      buttons
    })

    return body
  }

  const submitChallenge = (body, { setSubmitting }) => {
    const designContestId = (contest || {}).objectId
    //console.log(body.contestId)
    try {
      const apiName = `${designContestId ? 'update' : 'create'}DesignContest1`

      api(apiName, body)
        .then(result => {
          console.log('SAVE COMPLETE!!')
          setSubmitting(false)

          if (result.error) {
            console.log('ERROR IN SAVING!!!!')
          } else {
            console.log('SAVE COMPLETE!!')
            history.push('/challenges')
          }
        })
        .catch(error => {
          setSubmitting(false)
          console.log('SYSTEM ERROR IN SAVING!!!!  ' + error)
        })
    } catch (e) {
      setSubmitting(false)
      console.log('SYSTEM ERROR IN SAVING!!!!  ' + e)
    }
  }

  const initialValues = {
    objectId: (contest || {}).objectId,
    title: contest.title,
    status: contest.status,
    categoryId: contest.categoryId || '',
    badgeId:
      contest.badge && contest.badge.objectId ? contest.badge.objectId : '',
    type: contest.type,
    requirement: contest.requirement,
    guidelines: contest.guidelines,
    guidelinesShort: contest.guidelinesShort,
    likesRequired: contest.likesRequired || 0,
    coinReward: contest.coinReward || 0,
    featuredAt: contest.featuredAt,
    reward: contest.reward,
    seriesTitle: contest.seriesTitle || '',
    numChallenges: contest.numChallenges,
    buttons: JSON.stringify(contest.buttons)
  }

  return (
    <div className={styles.wrap}>
      <BackLongButton onClick={goBack}>Return to Challenge</BackLongButton>
      <h2 className="py-3">Challenge</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting, setFieldError, setFieldValue }) => {
          console.log('SUBMITTING')
          const body = prepareSubmission(values)
          submitChallenge(body, { setSubmitting })
        }}
        onReset={() => {
          resetImages()
        }}
        validationSchema={challengeSchema}
      >
        {props => {
          const { values, isSubmitting, handleSubmit } = props
          return (
            <Form onSubmit={handleSubmit}>
              {typeof values.objectId === 'undefined' ? null : (
                <Card className="rounded mb-3">
                  <Card.Body>
                    <Container fluid="true">
                      <Row>
                        <Col>
                          <h4 className="m-0 p-0">
                            {(contest || {}).objectId}
                            <CopyToClipboard text={(contest || {}).objectId}>
                              <FontAwesomeIcon
                                icon="copy"
                                size="1x"
                                className={`${styles.copy} ml-2`}
                              />
                            </CopyToClipboard>
                          </h4>
                        </Col>
                        <Col
                          className={`align-items-center align-self-center 
                            justify-content-center text-right text-uppercase
                            font-weight-bold ${
                              contest.status === 'active'
                                ? 'text-success'
                                : 'text-danger'
                            }`}
                        >
                          {contest.status === 'active' ? 'active' : 'ended'}
                        </Col>
                      </Row>
                    </Container>
                  </Card.Body>
                </Card>
              )}

              <Card className="rounded">
                <Card.Header>
                  <h3 className="m-0">Information</h3>
                </Card.Header>
                <Card.Body>
                  <DMInputGroup
                    title="Title"
                    id="title"
                    disabled={isSubmitting}
                    {...props}
                  />
                  <DMSelectGroup
                    title="Category"
                    id="categoryId"
                    disabled={isSubmitting}
                    {...props}
                  >
                    {categoriesOptions}
                  </DMSelectGroup>
                  <DMTextAreaGroup
                    title="Requirement"
                    id="requirement"
                    rows="3"
                    disabled={isSubmitting}
                    {...props}
                  />
                  <DMTextAreaGroup
                    title="Guidelines"
                    id="guidelines"
                    rows="8"
                    disabled={isSubmitting}
                    {...props}
                  />
                  <DMTextAreaGroup
                    title="Guidelines Short"
                    id="guidelinesShort"
                    rows="3"
                    disabled={isSubmitting}
                    {...props}
                  />
                  <DMTextAreaGroup
                    title="Placment Buttons (JSON format)"
                    id="buttons"
                    rows="5"
                    disabled={isSubmitting}
                    {...props}
                  />
                </Card.Body>
              </Card>
              <Card className="rounded mt-3">
                <Card.Header>
                  <h3 className="m-0">Challenge Type</h3>
                </Card.Header>
                <Card.Body>
                  <DMSelectGroup
                    title="Type"
                    id="type"
                    disabled={isSubmitting}
                    {...props}
                  >
                    <option value="design">Design</option>
                    <option value="series">Series</option>
                  </DMSelectGroup>
                  {values.type === 'series' && (
                    <DMNumberGroup
                      title="Num Series Challenges"
                      id="numChallenges"
                      min={0}
                      max={100}
                      disabled={isSubmitting}
                      {...props}
                    />
                  )}
                  {values.type === 'series' && (
                    <DMInputGroup
                      title="Series Title"
                      id="seriesTitle"
                      disabled={isSubmitting}
                      {...props}
                    />
                  )}
                </Card.Body>
              </Card>
              <Card className="rounded mt-3">
                <Card.Header>
                  <h3 className="m-0">Images</h3>
                </Card.Header>
                <Card.Body>
                  <Form.Row>
                    <Col>
                      <DMImageUploadGroup
                        title="Thumbnail Image"
                        id="thumbImageFile"
                        url={thumbUrl}
                        onUpload={onUploadImage}
                        disabled={isSubmitting}
                        {...props}
                      />
                    </Col>
                    <Col>
                      <DMImageUploadGroup
                        title="Backdrop Image"
                        id="backdropImageFile"
                        url={backdropUrl}
                        onUpload={onUploadImage}
                        disabled={isSubmitting}
                        {...props}
                      />
                    </Col>
                    <Col>
                      <DMImageUploadGroup
                        title="Contest Image"
                        id="contestImageFile"
                        url={contestUrl}
                        onUpload={onUploadImage}
                        disabled={isSubmitting}
                        {...props}
                      />
                    </Col>
                  </Form.Row>
                </Card.Body>
              </Card>
              <Card className="rounded mt-3">
                <Card.Header>
                  <h3 className="m-0">Rewards</h3>
                </Card.Header>
                <Card.Body>
                  <DMInputGroup
                    title="Reward Description"
                    id="reward"
                    disabled={isSubmitting}
                    {...props}
                  />

                  <Form.Row>
                    <Col>
                      <DMNumberGroup
                        title="Like Required"
                        id="likesRequired"
                        min={0}
                        max={1000}
                        disabled={isSubmitting}
                        {...props}
                      />
                    </Col>
                    <Col>
                      <DMNumberGroup
                        title="Coin Reward Amount"
                        id="coinReward"
                        min={0}
                        max={1000}
                        disabled={isSubmitting}
                        {...props}
                      />
                    </Col>
                  </Form.Row>
                  <DMSelectGroup
                    title="Badge"
                    id="badgeId"
                    disabled={isSubmitting}
                    {...props}
                  >
                    <option value="">none</option>
                    {badgeOptions}
                  </DMSelectGroup>
                </Card.Body>
              </Card>
              <Card className="rounded mt-3">
                <Card.Header>
                  <h3 className="m-0">Feature Time</h3>
                </Card.Header>
                <Card.Body>
                  <Form.Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Start Date/Time</Form.Label>
                        <DateTimePicker
                          dropUp
                          id="featuredAt"
                          value={featuredAt}
                          onChange={value => setFeaturedAt(value)}
                          disabled={isSubmitting}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>End Date/Time</Form.Label>
                        <DateTimePicker
                          dropUp
                          id="expiresAt"
                          value={expiresAt}
                          onChange={value => setExpiresAt(value)}
                          disabled={isSubmitting}
                        />
                      </Form.Group>
                    </Col>
                  </Form.Row>
                </Card.Body>
              </Card>
              <Card className="rounded mt-3 mb-5">
                <Card.Body className="text-center">
                  {typeof values.objectId === 'undefined' ? (
                    <SubmitButton
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                    >
                      Save
                    </SubmitButton>
                  ) : (
                    <SubmitButton
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                    >
                      Update
                    </SubmitButton>
                  )}
                </Card.Body>
              </Card>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default ChallengesDetail
