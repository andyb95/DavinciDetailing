import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './components/Home/Home'
import Admin from './components/Admin/Admin'
import Account from './components/Account/Account'
import Services from './components/Services/Services'
import Contact from './components/Contact/Contact'
import Cart from './components/Cart/Cart'
import Login from './components/Login/Login'
import Register from './components/Register/Register'

export default (
  <Switch>
    <Route exact path='/' component={Home}/>
    {/* protectedRoute for admin? */}
    <Route path='/admin' component={Admin}/>
    <Route path='/account' component={Account}/>
    <Route path='/services' component={Services}/>
    <Route path='/contact' component={Contact}/>
    <Route path='/cart' component={Cart}/>
    <Route path='/login' component={Login}/>
    <Route path='/register' component={Register}/>
  </Switch>
)