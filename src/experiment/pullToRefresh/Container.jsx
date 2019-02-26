import React from 'react'
import PropTypes from 'prop-types'
import PullList from './List'

/**
 * Created by yuepeng.li on 2019/1/24
 */

class Container extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  getData = () => {
    this.setState({
      loading: true
    })
    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 5000)
  }

  render () {
    return (
      <PullList
        pullPlaceholder='pull to refresh'
        triggerPlaceholder='release to refresh'
        loadingPlaceholder='Loading'
        handleRefresh={this.getData}
        loading={this.state.loading}/>
    )
  }
}

Container.propTypes = {
  foo: PropTypes.string
}

export default Container
