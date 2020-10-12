import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Landing from './components/Landing'
import Profile from './components/Profile'
import Home from './components/Home'
import Tip from './components/Tip'
import Filtermentor from './components/Filtermentor'
import Filteraitip from './components/Filteraitip'
import Room from './components/Room'
import Faq from './components/Faq'
import Chart from './components/Chart'

class App extends Component {

  constructor(props) {
    super(props)
      this.state = {
        isLoading: true,
        user: {},
        tokendata: null
      }
  }

  render() {
    return (
      <Router>
        <div className="App">      
          <Route exact path="/" component={Landing} />
        
            <Route exact path="/profile" component={Profile} {...this.props}/>
            <Route exact path="/home" component={Home} {...this.props}/>
            <Route exact path="/tip" component={Tip} {...this.props}/>
            <Route exact path="/faq" component={Faq} {...this.props}/>
            <Route exact path="/room" component={Room} {...this.props}/>
            <Route exact path="/chart" component={Chart} {...this.props}/>
            <Route exact path="/filtermentor" component={Filtermentor} {...this.props}/>
            <Route exact path="/Filteraitip" component={Filteraitip} {...this.props}/>
        </div>
      </Router>
    )
  }
}

export default App