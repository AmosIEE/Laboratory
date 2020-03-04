import React from 'react'
import { observer, inject } from 'mobx-react'

/**
 * Created by yuepeng.li on 2019/1/14
 */
@inject('mobxStore')
@observer
class MobxSelfObserver extends React.Component {
  changeFilter = (e) => {
    const {changeFilter} = this.props.mobxStore
    changeFilter(e.target.value)
  }
  render() {
    const {filter, filteredTodo} = this.props.mobxStore
    return (
      <div className='container'>
        <h2>TODO</h2>
        <input placeholder='Change Filter' value={filter} onChange={this.changeFilter}/>
        <ul>
          {
            filteredTodo.map(todo => <li key={todo}>{todo}</li>)
          }
        </ul>
      </div>
    )
  }

  // onReset() {
  //   state.resetTimer();
  // }
}

export default MobxSelfObserver
