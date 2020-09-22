import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './components/Home/Home'
import Account from './components/Account/Account'
import Referrals from './components/Referrals/Referrals'
import Chat from './components/Chat/Chat'
import Professionals from './components/Professionals/Professionals'
import Login from './components/Login/Login'
import Feed from './components/Feed/Feed'

export default (
  <Switch>
    <Route exact path='/' component={Home}/>
    <Route path='/account' component={Account}/>
    <Route path='/referrals' component={Referrals}/>
    <Route path='/chat' component={Chat}/>
    <Route path='/professionals' component={Professionals}/>
    <Route path='/login' component={Login}/>
    <Route path='/feed' component={Feed}/>
  </Switch>
)