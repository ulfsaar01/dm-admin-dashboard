import React, { useState } from 'react'
import { Form, Col, Card, Button, ButtonGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DateTimePicker, NumberPicker } from 'react-widgets'

import styles from './co.module.css'


//import DateTimePicker from 'react-widgets/lib/DateTimePicker';

const ChallengesDetail = props => {
  const state = props.location.state
  //console.log(state.contest)
  return (
    <div className={styles.wrap}>
      <Form>
        <Card className="rounded-0">
        <Card.Header>Challenge</Card.Header>
          <Card.Body>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text"/>
            </Form.Group>
            <Form.Row>
              <Col>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Category</Form.Label>
                  <Form.Control as="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Type</Form.Label>
                  <Form.Control as="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
            
            
            
        
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Requirement</Form.Label>
              <Form.Control as="textarea" rows="3" />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Guidelines</Form.Label>
              <Form.Control as="textarea" rows="3" />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Guidelines Short</Form.Label>
              <Form.Control as="textarea" rows="3" />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Buttons (JSON format)</Form.Label>
              <Form.Control as="textarea" rows="3" />
            </Form.Group>
          </Card.Body>
        </Card>    
        <Card className="rounded-0 mt-3">
          <Card.Header>Images</Card.Header>
          <Card.Body>
            <Form.Row>
              <Col>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Thumbnail Image</Form.Label>
                  <Form.Control as="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Backdrop Image</Form.Label>
                  <Form.Control as="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Contest Image</Form.Label>
                  <Form.Control as="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
          </Card.Body>
        </Card>
        <Card className="rounded-0 mt-3">
          <Card.Header>Rewards</Card.Header>
          <Card.Body>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Likes Requirement</Form.Label>
              <NumberPicker defaultValue={0} min={0} />
            </Form.Group>
          <Form.Row>
              <Col>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Reward</Form.Label>
                  <Form.Control type="text"/>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Coin Reward</Form.Label>
                  <NumberPicker defaultValue={0} min={0} />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Badge</Form.Label>
              <Form.Control as="select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
          </Card.Body>
        </Card>    
        <Card className="rounded-0 mt-3">
          <Card.Header>Timeframe</Card.Header>
          <Card.Body>
            <Form.Row>
              <Col>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Feature Date/Time</Form.Label>
                  <DateTimePicker
                    defaultValue={new Date()}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Expire Date/Time</Form.Label>
                  <DateTimePicker
                    defaultValue={new Date()}
                  />
                </Form.Group>
              </Col>
            </Form.Row>
          </Card.Body>
        </Card>    
      </Form>
        {JSON.stringify(state.contest)}
      
    </div>
  )
}

export default ChallengesDetail
