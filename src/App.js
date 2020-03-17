import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBars,
  faPlus,
  faList,
  faThLarge,
  faHome,
  faFlagCheckered,
  faBook,
  faAward,
  faCrown,
  faFighterJet,
  faRocket,
  faHippo,
  faPencilAlt,
  faTimes,
  faSkull,
  faCloudUploadAlt,
  faImage,
  faSignOutAlt,
  faBrush,
  faChevronLeft,
  faCopy,
  faGift
} from '@fortawesome/free-solid-svg-icons'
import { faFortAwesome } from '@fortawesome/free-brands-svg-icons'
import { validateUser } from './redux/actions/AuthActions'

library.add(
  faBars,
  faPlus,
  faList,
  faThLarge,
  faHome,
  faFlagCheckered,
  faBook,
  faAward,
  faCrown,
  faFighterJet,
  faRocket,
  faFortAwesome,
  faHippo,
  faPencilAlt,
  faTimes,
  faSkull,
  faCloudUploadAlt,
  faImage,
  faSignOutAlt,
  faBrush,
  faChevronLeft,
  faCopy,
  faGift
)

const App = _ => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(validateUser())
  }, [dispatch])

  return (
    <div>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  )
}

export default App
