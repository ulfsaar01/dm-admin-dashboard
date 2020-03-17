import React, { useState, useEffect } from 'react'
import GiftsListView from '../components/gifts/GiftsListView'
import GiftsGridView from '../components/gifts/GiftsGridView'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { gifts as giftsAction } from '../redux/actions/GiftActions'
import { useLocation } from 'react-router-dom'
//import { ReactComponent as Couch } from '../assets/038-couch.svg'
//import { ReactComponent as Plant } from '../assets/039-plant.svg'
//import { ReactComponent as Fish } from '../assets/032-fishbowl.svg'
import Hero from '../components/hero/HeroSection'
import { ReactComponent as Flower } from '../assets/047-flower.svg'

const defaultGift = {
  objectId: null,
  title: '',
  status: '',
  numCoins: 0,
  thumbImageUrl: '',
  imageUrl: '',
  gifUrl: '',
}

const Gifts = props => {
  const { pathname } = useLocation()
  const history = useHistory()
  const [isGridView, setGridView] = useState(true)

  const dispatch = useDispatch()
  const { data, error, loading } = useSelector(state => state.gifts)

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(giftsAction())
  }, [dispatch, pathname])

  const toggleListView = () => {
    setGridView(false)
  }

  const toggleGridView = () => {
    setGridView(true)
  }

  
  const handleNewClick = gift => {
    const pathname = `/gifts/new`
    history.push(pathname, { gift: defaultGift })
  }


  const handleClick = gift => {
    const pathname = `/gifts/${(gift || {}).objectId}`
    history.push(pathname, { gift: gift })
  }

  return (
    <>
      <Hero
        sticker={Flower}
        title="Gifts"
        createTitle="Create Gift"
        styling="gold"
        isGridView={isGridView}
        toggleListView={toggleListView}
        toggleGridView={toggleGridView}
        handleNewClick={handleNewClick}
      />

      {isGridView ? (
        <GiftsGridView
          loading={loading}
          data={data}
          error={error}
          handleClick={handleClick}
        />
      ) : (
        <GiftsListView
          loading={loading}
          data={data}
          error={error}
          handleClick={handleClick}
        />
      )}
    </>
  )
}

export default Gifts
