import React from 'react'
import {Provider} from 'mobx-react'
import mobxStore from './mobxStore'
import MobxSelfObserver from './MobxSelfObserver'
/**
 * Created by yuepeng.li on 2019/1/18
 */
const store = {
  mobxStore
}

export const MobxProvider = (props) => {
  return (
    <Provider {...store}>
      <MobxSelfObserver />
    </Provider>
  )
}

export default MobxProvider
