import React from 'react'
import PropTypes from 'prop-types'
import './index.css'
/**
 * Created by yuepeng.li on 2019/3/12
 */

class GradientText extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    let text = 'asdasdas dasdas dasda\nasdasdasd asd asdsad\ndsadasd asdasd'
    text = text.replace(/\n/g, '<br/>')
    return (
      <div style={{background: '#fff'}}>
        <div className='gradient-container' dangerouslySetInnerHTML={{__html: text}}/>
      </div>
    )
  }
}

GradientText.propTypes = {
  foo: PropTypes.string
}

export default GradientText
