import React from 'react'
import PropTypes from 'prop-types'

/**
 * Created by yuepeng.li on 2019/1/22
 */
const MAX_EDGE = 70

class Item extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <li className='card'>
        Item {this.props.index}
      </li>
    )
  }
}

Item.propTypes = {
  foo: PropTypes.string
}

export default Item
