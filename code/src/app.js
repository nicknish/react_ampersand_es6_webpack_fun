import Router from './router'
import styles from './styles/main.styl'
import app from 'ampersand-app' // return singleton obj
import Me from './models/me'

window.app = app

app.extend({
  init () {
    this.me = new Me()
    this.me.fetchInitialData()
    this.router = new Router()
    this.router.history.start()
  }
})

app.init()

/* React Demo
========================== */
/*
// ES6
import React from 'react'
import styles from './styles/main.css'

const Hello = React.createClass({
  render () {
    return <div>Hello, {this.props.name}</div>
  }
})

React.render(<Hello name="henrik"/>, document.body)
*/

/* ES5
=========================== */
/*
// Node uses CommonJS RequireJS syntax
var React = require('react');

var Hello = React.createClass({
  // basic building block in every React module
  render: function() {
    // Brackets in JS?! WHAT!? (This is JSX)
    return <div>Hello, {this.props.name}</div>
  }
})

// React.render takes two properties, the class and where
React.render(<Hello name="henrik"/>, document.body);

// But where is the index.html?
*/
