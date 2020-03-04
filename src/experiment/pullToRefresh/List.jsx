import React from 'react'
import Item from './Item'
import '../slideToRemove/index.css'

/**
 * Created by yuepeng.li on 2019/1/22
 */

const MAX_LOADING_HEIGHT = 100

const compareTable = {
}

class PullList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      offset: 0,
      prev: 1,
      after: 0
    }
    this.refreshTrigged = false
    this.prevTouch = 0
  }

  componentDidMount () {
    document.body.addEventListener('scroll', this.handleTextFade)
    document.body.addEventListener('touchend', this.handleMiddleState)
  }

  handleMiddleState = (e) => {
    if (document.body.scrollTop >= 50 && document.body.scrollTop <= 300) {
       this.setState({
         prev: document.body.scrollTop / 300 < 0.5 ? 1 : 0,
         after: document.body.scrollTop / 300 < 0.5 ? 0 : 1
       })
    }
  }

  handleTextFade = (e) => {
    if (e.target.scrollTop < 50) {
      this.setState({
        prev: 1,
        after: 0
      })
    } else if (e.target.scrollTop <= 300) {
      this.setState({
        prev: 1 - e.target.scrollTop / 300,
        after: e.target.scrollTop / 300
      })
    } else {
      this.setState({
        prev: 0,
        after: 1
      })
    }
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
        <div className='nav-bar' style={{position: 'fixed', zIndex: 10, background: '#fff', textAlign: 'center', width: '100%', height: 50}}>
          <p style={{position: 'absolute', opacity: this.state.prev}}>Before</p>
          <p style={{position: 'absolute', opacity: this.state.after}}>After</p>
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
