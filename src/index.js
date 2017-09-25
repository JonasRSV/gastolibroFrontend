import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import Gastolibro from './containers/Gastolibro'

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  )
}

render(Gastolibro)

if (module.hot) {
  module.hot.accept('./containers/Gastolibro', () => { render(Gasolibro) })
}
