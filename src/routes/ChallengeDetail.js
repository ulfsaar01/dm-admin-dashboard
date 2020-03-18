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
  SubmitButton,
  SecondaryButton
} from '../components/common/FormControls'
import * as Yup from 'yup'
import moment from 'moment'
import { Formik } from 'formik'
import styles from './co.module.css'
import ERROR from '../constants/ValidationConstants'
import { api, getBase64File } from '../useFetch'
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
  /*
  const start = () => {
    exports.requestBase64 = function(url, callback) {
      request({
        url: url,
        isBuffer: true
      }, function (err, res, body) {
        if (err) return callback(err);
    
        var data = 'data:' + res.headers['content-type'] + ';base64,' + body.toString('base64');
        callback(err, res, data);
      });
    };
  }
*/
  useEffect(() => {
    window.scrollTo(0, 0)
    //start()
  }, [pathname])

  const history = useHistory()
  const { contest, badges } = (props.location || {}).state || {}
  const [toCopy, setToCopy] = useState(false)
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

      const fsize = Math.round(file.size/1024)

      if(fsize >= 5120) {
        alert("File is over 5MB limit")
        return
      }
      
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

  /*
  function startDownload() {
    let imageURL = "https://cdn.glitch.com/4c9ebeb9-8b9a-4adc-ad0a-238d9ae00bb5%2Fmdn_logo-only_color.svg?1535749917189";
   
    const downloadedImg = new Image;
    downloadedImg.crossOrigin = "Anonymous";
    downloadedImg.addEventListener("load", imageReceived, false);
    downloadedImg.src = imageURL;
  }


  const imageReceived = data => {
    console.log(data)
  }
*/
  const prepareSubmission = (values, isCopy = false) => {
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

    const designContestId =
      isCopy === true ? undefined : (contest || {}).objectId

    //return body
    var thumbImageData
    var backdropImageData
    var contestImageData

    return new Promise(async (resolve, reject) => {
      try {
        JSON.parse(buttons)
      } catch (e) {
        reject(e)
      }

      if (isCopy === true) {
        //convert all image urls to base64
        if (thumbUrl.includes('http')) {
          //console.log(thumbUrl)
          const data = await getBase64File(thumbUrl)
          thumbImageData = {
            __type: 'Bytes',
            base64: data
          }
        }
        if (backdropUrl.includes('http')) {
          //console.log(backdropUrl)
          const data = await getBase64File(backdropUrl)
          backdropImageData = {
            __type: 'Bytes',
            base64: data
          }
        }

        if (contestUrl.includes('http')) {
          //console.log(contestUrl)
          const data = await getBase64File(contestUrl)
          contestImageData = {
            __type: 'Bytes',
            base64: data
          }
        }
      } else {
        thumbImageData =
          thumbUrl && !thumbUrl.includes('http')
            ? {
                __type: 'Bytes',
                base64: thumbUrl
              }
            : undefined

        backdropImageData =
          backdropUrl && !backdropUrl.includes('http')
            ? {
                __type: 'Bytes',
                base64: backdropUrl
              }
            : undefined

        contestImageData =
          contestUrl && !contestUrl.includes('http')
            ? {
                __type: 'Bytes',
                base64: contestUrl
              }
            : undefined
      }
      const body = {
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
      }

      return resolve(body)
    }).catch(error => {
      throw error
    })
  }

  const submitChallenge = (body, { setSubmitting }) => {
    //const designContestId = (contest || {}).objectId
    //console.log(body.contestId)
    try {
      const apiName = `${
        body.designContestId ? 'update' : 'create'
      }DesignContest1`

      api(apiName, body)
        .then(result => {
          //console.log('SAVE COMPLETE!!')
          setSubmitting(false)

          if (result.error) {
            console.log('ERROR IN SAVING!!!!')
          } else {
            //console.log('SAVE COMPLETE!!')
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
    <div>
      <div className={`${styles.heroSm} decor`} />
      <div className={styles.wrap}>
        <BackLongButton onClick={goBack}>Return to Challenge</BackLongButton>
        <h2 className="py-3">Challenge</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={(
            values,
            { setSubmitting, setFieldError, setFieldValue }
          ) => {
            prepareSubmission(values, toCopy)
              .then(body => {
                submitChallenge(JSON.stringify(body), { setSubmitting })
              })
              .catch(error => {
                setFieldError(
                  'buttons',
                  'Looks like it is not formatted in JSON correctly'
                )
                setSubmitting(false)
              })
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
                        Create!
                      </SubmitButton>
                    ) : (
                      <>
                        <SecondaryButton
                          disabled={isSubmitting}
                          onClick={e => {
                            //props.values.foo = true
                            setToCopy(true)
                            props.handleSubmit(e)
                          }}
                        >
                          Create a Copy
                        </SecondaryButton>
                        <div className="d-inline pr-3" />
                        <SubmitButton
                          disabled={isSubmitting}
                          onClick={handleSubmit}
                        >
                          Update
                        </SubmitButton>
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Form>
            )
          }}
        </Formik>
      </div>
    </div>
  )
}

export default ChallengesDetail
