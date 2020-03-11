import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { challenges as challengesAction } from '../redux/actions/ChallengeActions'

const Blogs = () => {
  const dispatch = useDispatch()
  const { data, error, loading } = useSelector(state => state.challenges)

  useEffect(() => {
    dispatch(challengesAction())
  }, [dispatch])

  if (loading) return <div>LOADING!</div>
  if (error) return <div>ERROR</div>

  return <div>{JSON.stringify(data)}</div>
}
export default Blogs
