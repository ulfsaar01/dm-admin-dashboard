import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Card } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  DMInputGroup,
  DMNumberGroup,
  DMImageUploadGroup,
  BackLongButton,
  SubmitButton
} from '../components/common/FormControls'
import * as Yup from 'yup'
import { Formik } from 'formik'
import styles from './co.module.css'
import ERROR from '../constants/ValidationConstants'
import { api, sendBase64File } from '../useFetch'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const giftSchema = Yup.object().shape({
  title: Yup.string().required(ERROR.REQUIRE)
})

const GiftDetail = props => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  const history = useHistory()
  const { gift } = (props.location || {}).state || {}

  const [thumbUrl, setThumbUrl] = useState(gift.thumbImageUrl || null)
  const [imageUrl, setImageUrl] = useState(gift.imageUrl || null)
  const [animatedUrl, setAnimatedUrl] = useState(gift.gifUrl || null)

  const savedAnimatedUrl = (gift.gifUrl || null)

  const [thumbFile, setThumbFile] = useState()
  const [imageFile, setImageFile] = useState()

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
            setThumbFile(file)
            return setThumbUrl(e.target.result)
          }
          case 'imageImageFile': {
            setImageFile(file)
            return setImageUrl(e.target.result)
          }
          case 'animatedImageFile': {
            return setAnimatedUrl(e.target.result)
          }
          default:
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadToS3 = file => {
    return new Promise(async resolve => {
      if (file && file.name) {
        const ext = file.name.split('.').pop()
        const result = await api('getSignedUrl1', JSON.stringify({ ext }))
        const { signedUrl } = result.result
        const url = await sendBase64File(signedUrl, file)
        return resolve(url.config.url.split('?')[0])
      } else {
        return resolve()
      }
    }).catch(error => {
      throw error
    })
  }

  const prepareSubmission = values => {
    let { title, numCoins } = values

    const body = {
      title,
      numCoins
    }

    if(gift.objectId) {
      body.virtualGiftId = gift.objectId
    }

    if (animatedUrl !== null && animatedUrl !== savedAnimatedUrl) {
      body.gifData = {
        __type: 'Bytes',
        base64: animatedUrl
      }
    }

    return new Promise(async resolve => {
      const turl = await uploadToS3(thumbFile)
      body.thumbImageUrl = turl
      const iurl = await uploadToS3(imageFile)
      body.imageUrl = iurl
      return resolve(body)
    }).catch(error => {
      throw error
    })
  }

  const submitGift = body => {
    return new Promise(async resolve => {
      const result = await api('createVirtualGift1', JSON.stringify(body))
      return resolve(result)
    }).catch(error => {
      throw error
    })
  }

  const initialValues = {
    objectId: (gift || undefined).objectId,
    title: gift.title,
    status: gift.status,
    numCoins: gift.numCoins
  }

  return (
    <div>
      <div className={`${styles.heroSm} decor`} />
      <div className={styles.wrap}>
        <BackLongButton onClick={goBack}>Return to Gift</BackLongButton>
        <h2 className="py-3">Gift</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            prepareSubmission(values)
              .then(body => {
                console.log(body)
                
                submitGift(body).then(result => {
                  console.log(result)
                  setSubmitting(false)
                  history.push('/gifts')
                })
              })
              .catch(error => {
                console.error(error)
                setSubmitting(false)
              })
          }}
          validationSchema={giftSchema}
        >
          {props => {
            const { values, isSubmitting, handleSubmit } = props
            return (
              <Form onSubmit={handleSubmit}>
                {!values.objectId ? null : (
                  <Card className="rounded mb-3">
                    <Card.Body>
                      <Container fluid="true">
                        <Row>
                          <Col>
                            <h4 className="m-0 p-0">
                              {(gift || {}).objectId}
                              <CopyToClipboard text={(gift || {}).objectId}>
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
                              gift.status === 'active'
                                ? 'text-success'
                                : 'text-danger'
                            }`}
                          >
                            {gift.status === 'active' ? 'active' : 'inactive'}
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
                    <DMNumberGroup
                      title="Cost (Coins)"
                      id="numCoins"
                      min={0}
                      max={100000}
                      disabled={isSubmitting}
                      {...props}
                    />
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
                          title="Image"
                          id="imageImageFile"
                          url={imageUrl}
                          onUpload={onUploadImage}
                          disabled={isSubmitting}
                          {...props}
                        />
                      </Col>
                      <Col>
                        <DMImageUploadGroup
                          title="Animation"
                          id="animatedImageFile"
                          url={animatedUrl}
                          onUpload={onUploadImage}
                          disabled={isSubmitting}
                          {...props}
                        />
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
    </div>
  )
}

export default GiftDetail

/* --- THIS WORKS!!!
const s3 = new AWS.S3()
const myBucket = 'dm-gift-test'
const myKey = thumbFile.name
const signedUrlExpireSeconds = 500
var upload = new AWS.S3.ManagedUpload({
  params: {
    Bucket: myBucket,
    Key: myKey,
    Body: thumbFile,
    ACL: 'public-read'
  }
})
var promise = upload.promise()
promise.then(
  function(data) {
    console.log(data)
  },
  function(err) {
    console.log('There was an error uploading your photo: ', err.message)
  }
)
*/
