import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import Parse from "parse";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faPlus, faList, faThLarge, faHome, faFlagCheckered, faBook, faAward, faCrown, faFighterJet, faRocket, faHippo} from '@fortawesome/free-solid-svg-icons'
import { faFortAwesome } from '@fortawesome/free-brands-svg-icons'

import { validateUser } from './redux/actions/AuthActions'

library.add(faBars, faPlus, faList, faThLarge, faHome, faFlagCheckered, faBook, faAward, faCrown, faFighterJet, faRocket, faFortAwesome, faHippo)

const App = _ => {
  const dispatch = useDispatch()
  Parse.initialize(process.env.REACT_APP_APPID);
  Parse.serverURL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    dispatch(validateUser())
  }, [dispatch])

  return (
    <div>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
