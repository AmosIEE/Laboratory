import React from 'react'
import createHistory from 'history/createBrowserHistory'
import {Router, Switch, Route} from 'react-router-dom'
import Canvas from './experiment/voucher/Canvas'
import HomePage from './HomePage'
import MobxProvider from './experiment/mobx/MobxProvider'
import List from './experiment/slideToRemove/List'
import Container from './experiment/pullToRefresh/Container'
import Camera from './experiment/faceDetection/Camera'
/**
 * Created by yuepeng.li on 2019/1/16
 */

const history = createHistory()

export const route = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/experiment/camera' exact component={Camera}/>
        <Route path='/experiment/voucher' exact component={Canvas} />
        <Route path='/experiment/mobx' exact component={MobxProvider} />
        <Route path='/experiment/list' exact component={List} />
        <Route path='/experiment/pullToRefresh' exact component={Container} />
        <Route path='/experiment/camera' exact component={Container} />
      </Switch>
    </Router>
  )
}

export default route
