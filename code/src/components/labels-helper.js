import React from 'react'

export default React.createClass({  
  displayName: 'labelHelper',
  
  render () {
    const {label} = this.props.repo

    return (
      <div className='label'>
        <span className='label-color' style={{backgroundColor: cssColor}}>&nbsp;{label.name}</span>
        <span></span>
        <span className='octicon octicon-pencil'></span>
        <span className='octicon octicon-x'></span>
      </div>
    )
  }
})