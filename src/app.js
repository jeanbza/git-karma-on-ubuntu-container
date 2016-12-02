import '../stylesheets/app.scss' // required for wepback to build css

import React from 'react'
import {render} from 'react-dom'
import SomeReactComponent from './SomeReactComponent'

render(<SomeReactComponent />, document.getElementById('root'))