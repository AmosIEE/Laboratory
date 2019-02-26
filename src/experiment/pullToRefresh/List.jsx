import React from 'react'
import Item from './Item'
import '../slideToRemove/index.css'

/**
 * Created by yuepeng.li on 2019/1/22
 */

const MAX_LOADING_HEIGHT = 100

class PullList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      offset: 0
    }
    this.refreshTrigged = false
    this.prevTouch = 0
  }

  componentDidUpdate (prevProps) {
    if (prevProps.loading && !this.props.loading) {
      this.prevTouch = 0
      this.refreshTrigged = false
      this.setState({
        offset: 0
      })
    }
  }

  handleScrollStart = (e) => {
    if (this.props.loading) {
      return
    }
    this.prevTouch = e.touches[0].pageY
  }

  handleScroll = (e) => {
    if (this.props.loading) {
      return
    }
    const currentTouch = e.touches[0].pageY
    const scrollOffset = document.body.scrollTop

    if (scrollOffset <= 0) {
      this.setState({
        offset: currentTouch - this.prevTouch >= 0
          ? currentTouch - this.prevTouch >= MAX_LOADING_HEIGHT ? MAX_LOADING_HEIGHT : currentTouch - this.prevTouch
          : 0
      })
      if (currentTouch - this.prevTouch >= MAX_LOADING_HEIGHT) {
        this.prevTouch = this.prevTouch + (currentTouch - this.prevTouch - MAX_LOADING_HEIGHT)
      }
      this.refreshTrigged = currentTouch - this.prevTouch - MAX_LOADING_HEIGHT + 20 > 0
    }
  }

  handleScrollEnd = () => {
    if (this.props.loading) {
      return
    }
    if (this.state.offset > 0) {
      if (this.refreshTrigged) {
        this.props.handleRefresh()
      } else {
        this.prevTouch = 0
        this.setState({
          offset: 0
        })
      }
    }
  }

  render () {
    let style = {
      transform: `translateY(${this.state.offset}px)`
    }
    if (this.state.offset === 0) {
      style.transition = 'transform 0.6s ease ' + (this.refreshTrigged ? '1s' : '0s')
    }
    return (
      <div onTouchStart={this.handleScrollStart}
           style={{position: 'relative'}}
           onTouchMove={this.handleScroll}
           onTouchEnd={this.handleScrollEnd}>
        <div style={{position: 'absolute'}}>
          { this.props.loading
            ? this.props.loadingPlaceholder
            : this.refreshTrigged ? this.props.triggerPlaceholder :
              this.state.offset > 0
                ? this.props.pullPlaceholder
                : ''
          }
        </div>
        <ul
          className='list'
          style={style}>
          {
            Array.from(new Array(50)).map((i, index) => {
              return <Item index={index}/>
            })
          }
        </ul>
      </div>
    )
  }
}

export default PullList
