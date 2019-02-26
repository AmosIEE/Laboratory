import React from 'react'
import PropTypes from 'prop-types'

/**
 * Created by yuepeng.li on 2019/1/22
 */
const MAX_EDGE = 70

class Item extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      left: props.activeDelete ? -MAX_EDGE : 0
    }
    this.prevOffset = 0
    this.moving = false
    this.overHalf = false
    this.showRemove = props.activeDelete
  }

  componentDidUpdate (prevProps) {
    if (prevProps.activeDelete && !this.props.activeDelete) {
      this.overHalf = false
      this.moveTo()
      this.showRemove = false
      this.prevOffset = 0
    }
  }

  handleMoveStart = (e) => {
    if (this.timer) {
      window.cancelAnimationFrame(this.timer)
    }
    const touches = e.touches
    if (touches.length === 1) {
      this.prevOffset = touches[0].pageX
      if (!this.props.activeDelete) {
        this.props.setActiveDelete(null)
      }
      this.moving = true
    }
  }

  handleMove = (e) => {
    const touches = e.touches
    if (this.moving) {
      if (touches.length !== 1) {
        this.overHalf = false
        this.handleMoveEnd(e)
        return
      }
      const currentOffset = touches[0].pageX
      if (
        (!this.showRemove && this.prevOffset - currentOffset > MAX_EDGE) ||
        (this.showRemove && currentOffset - this.prevOffset <=0)
      ) {
        this.overHalf = true
        this.setState({
          left: -MAX_EDGE
        })
      } else if (
        (!this.showRemove && this.prevOffset - currentOffset <= 0) ||
        (this.showRemove && currentOffset - this.prevOffset > MAX_EDGE)){
        this.overHalf = false
        this.setState({
          left: 0
        })
      } else {
        this.overHalf = this.showRemove
          ? currentOffset - this.prevOffset < MAX_EDGE / 2
          : this.prevOffset - currentOffset > MAX_EDGE / 2
        this.setState({
          left: this.showRemove ? currentOffset - this.prevOffset - MAX_EDGE : currentOffset - this.prevOffset
        })
      }
    }
  }

  handleMoveEnd = (e) => {
    if (this.moving) {
      this.moving = false
      this.prevOffset = 0
      this.moveTo()
      this.showRemove = this.overHalf
      if (this.overHalf) {
        this.props.setActiveDelete(this.props.index)
      }
      this.overHalf = false
    }
  }

  moveTo = () => {
    const current = this.state.left
    const target = this.overHalf ? -MAX_EDGE : 0
    const totalNeedMove = target - current
    const startTime = +new Date()
    const duration = 800
    // easeOutQuint decelerating to zero velocity
    const easeSpeed = function (t) { return 1 + (--t) * t * t * t * t }

    const animateFunc = () => {
      const currentTime = duration - Math.max(0, startTime - (+new Date()) + duration)
      const usedPercent = currentTime / duration

      const speed = easeSpeed(usedPercent)

      this.setState({
        left: current + totalNeedMove * speed,
      })
      this.timer = window.requestAnimationFrame(animateFunc)
      if (currentTime === duration) {
        window.cancelAnimationFrame(this.timer)
      }
    }
    this.timer = window.requestAnimationFrame(animateFunc)
  }

  render () {
    return (
      <li
        className='card'
        style={{left: this.state.left}}
        onTouchStart={this.handleMoveStart}
        onTouchMove={this.handleMove}
        onTouchEnd={this.handleMoveEnd}>
        Item {this.props.index}
      </li>
    )
  }
}

Item.propTypes = {
  foo: PropTypes.string
}

export default Item
