import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Console from './routes/Console'
import Login from './routes/Login'

const AppRoutes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/console" component={Console} />
        <Route
          path={['/i', '/s', '/challenges', '/blog']}
          component={Console}
        />
      </Switch>
    </div>
  )
}

export default AppRoutes
