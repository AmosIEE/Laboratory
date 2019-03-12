import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

/**
 * Created by yuepeng.li on 2019/1/24
 */

class Navigator extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div>
        <ul >
          <li style={{textAlign: 'left'}}><Link to='/experiment/voucher'>Voucher</Link></li>
          <li style={{textAlign: 'left'}}><Link to='/experiment/mobx'>Mobx</Link></li>
          <li style={{textAlign: 'left'}}><Link to='/experiment/list'>List</Link></li>
          <li style={{textAlign: 'left'}}><Link to='/experiment/pullToRefresh'> Pull to refresh</Link></li>
          <li style={{textAlign: 'left'}}><Link to='/experiment/camera'>Face Detection</Link></li>
          <li style={{textAlign: 'left'}}><Link to='/experiment/gradient'>Gradient</Link></li>
        </ul>
      </div>
    )
  }
}

Navigator.propTypes = {
  foo: PropTypes.string
}

export default Navigator
