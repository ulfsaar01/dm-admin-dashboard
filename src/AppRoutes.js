import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './routes/Home'
import Login from './routes/Login'

const AppRoutes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
  )
}

export default AppRoutes
