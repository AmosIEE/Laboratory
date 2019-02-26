import React from 'react'
import logo from './logo.svg'
import {Link} from 'react-router-dom'
import Navigator from './Navigator'

/**
 * Created by yuepeng.li on 2019/1/16
 */

class HomePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Laboratory
          </p>
          <Navigator/>

        </header>

      </div>
    )
  }
}

export default HomePage
