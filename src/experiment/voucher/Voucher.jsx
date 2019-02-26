import React from 'react'
import PropTypes from 'prop-types'

/**
 * Created by yuepeng.li on 2019/1/16
 */

class Voucher extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className="voucher">
        <div className="voucher-prev voucher-left-corner">asdasdasd</div>
        <div className="voucher-body voucher-right-corner">ashdgadmnadbmnasdbasdbmasb</div>
      </div>
    )
  }
}

Voucher.propTypes = {
  foo: PropTypes.string
}

export default Voucher
