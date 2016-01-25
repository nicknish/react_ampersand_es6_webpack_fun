import app from 'ampersand-app'
import React from 'react'
import localLinks from 'local-links'

export default React.createClass({

  displayName: 'NavHelper',

  onClick (event) {
    console.log('clicked')
    const pathname = localLinks.getLocalPathname(event)

    // Any click is going to bubble up to this
    // This handler will determine if it's a local pathname
    // If so, then it will prevent the native navigation to occur
    if (pathname) {
      event.preventDefault()
      app.router.history.navigate(pathname);
    }
  },
  
  render () {
    return (
      <div {...this.props} onClick={this.onClick}>
        {this.props.children}
      </div>
    )
  }
})
