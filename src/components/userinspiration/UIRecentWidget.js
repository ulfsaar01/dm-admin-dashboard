import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Table } from 'react-bootstrap'
import Loader from '../common/Loader'
import { userInspirationsRecentPcg } from '../../redux/actions/UserInspirationActions'
import { ReactComponent as Logo } from '../../assets/dm-d-logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const Entry = ({ inspire }) => {
  return (
    <tr key={inspire.objectId}>
      <td className="text-dm-grey align-middle pl-4 py-1">
        {inspire.objectId}
        <CopyToClipboard text={(inspire || {}).objectId}>
          <FontAwesomeIcon icon="copy" size="1x" className={`pointer ml-2`} />
        </CopyToClipboard>
      </td>
      <td className="py-1">
        <img
          src={
            inspire.idea && inspire.idea.cfThumbImageUrl
              ? inspire.idea.cfThumbImageUrl
              : ''
          }
          width="40"
          alt={inspire.objectId}
        />
      </td>
      <td className="text-dm-grey align-middle py-1">
        {truncate(inspire.title, 40)}
      </td>
    </tr>
  )
}

const truncate = (str, length, ending) => {
  if (length == null) {
    length = 100
  }
  if (ending == null) {
    ending = '...'
  }
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending
  } else {
    return str
  }
}

const UIRecentWidget = props => {
  const dispatch = useDispatch()
  const { data, loading } = useSelector(state => state.inspirations)

  useEffect(() => {
    dispatch(userInspirationsRecentPcg())
  }, [dispatch])

  if (loading) {
    return <Loader />
  }

  if ((data || {}).error) {
    return <div>Error</div>
  }

  const { userInspirations } = data.result

  return (
    <>
    <div className="widgetTitleTrans mb-2"><Logo className="logoIconTrans mr-2" />
    Recent DecorMatters Design</div>
    <Card className="rounded mb-3 shadow-sm overflow-hidden">
      <Card.Body className="p-0">
        <Table hover variant="light my-0">
          <colgroup>
            <col width="180" />
            <col width="50" />
          </colgroup>
          <tbody>
            {userInspirations.map(inspire => (
              <Entry key={inspire.objectId} inspire={inspire} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
    </>
  )
}

export default UIRecentWidget
