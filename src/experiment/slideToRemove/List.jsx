import React from 'react'
import PropTypes from 'prop-types'
import Item from './Item'
import './index.css'

/**
 * Created by yuepeng.li on 2019/1/22
 */

class List extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeDelete: null
    }
  }

  setActiveDelete = (index) => {
    this.setState({
      activeDelete: index
    })
  }

  render () {
    return (
      <ul className='list'>
        {
          Array.from(new Array(10)).map((i, index) => {
            return <Item
              index={index}
              setActiveDelete={(item) => this.setActiveDelete(item)}
              activeDelete={this.state.activeDelete === index}/>
          })
        }
      </ul>
    )
  }
}

List.propTypes = {
  foo: PropTypes.string
}

export default List
