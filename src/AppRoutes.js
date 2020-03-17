import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Console from './routes/Console'

const AppRoutes = () => {
  return (
    <div>
      <Switch>
        <Route
          path={['/challenges', '/badges', '/gifts']}
          component={Console}
        />
        <Route component={Console} />
      </Switch>
    </div>
  )
}

export default AppRoutes
