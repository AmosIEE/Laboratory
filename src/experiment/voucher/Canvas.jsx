import React from 'react'
import './style.css'
import Voucher from './Voucher'
/**
 * Created by yuepeng.li on 2019/1/16
 */

class Canvas extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div>
        <div className="container">
          <Voucher />
        </div>
        <div className="container">
          <Voucher />
        </div>
      </div>
    )
  }
}

export default Canvas
