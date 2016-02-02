import React from 'react'
import ampersandMixin from 'ampersand-react-mixin'

export default React.createClass({
  mixins: [ampersandMixin],
  
  onEditClick (event) {
    event.preventDefault()
    this.props.label.editing = true
  },

  onCancelClick (event) {
    event.preventDefault()
    const {label} = this.props

    if (label.saved) {
      label.editing = false
      this.setState(this.getInitialState())
    } else {
      label.destroy()
    }
  },

  onDeleteClick (event) {
    event.preventDefault()
    this.props.label.destroy()
  },

  getInitialState () {
    const {name, color} = this.props.label
    
    return {name, color}
  },

  onNameChange (event) {
    // React will rerender state
    this.setState({
      // event.target.value grabs input value
      name: event.target.value
    })
  },

  onColorChange (event) {
    // React will rerender state
    this.setState({
      // event.target.value grabs input value
      // slice(1) will not allow user to remove #
      color: event.target.value.slice(1)
    })
  },

  onSubmit (event) {
    event.preventDefault()
    const {label} = this.props

    if (label.saved) {
      label.update(this.state)
    } else {
      // pass attributs
      label.save(this.state)
    }

    label.editing = false
  },

  render () {
    const {label} = this.props
    const {color} = this.state
    const cssColor = '#' + color
    let content

    // editing
    if (label.editing) {
      content = (
        <form onSubmit={this.onSubmit} className='label'>
          <span style={{backgroundColor: cssColor}} className='label-color avatar avatar-small avatar-rounded'>&nbsp;</span>
          <input name='name' onChange={this.onNameChange} value={this.state.name}/>
          <input name='color' onChange={this.onColorChange} value={cssColor}/>
          <button type='submit' className='button button-small'>Save</button>
          <button onClick={this.onCancelClick} type='button' className='button button-small button-unstyled'>cancel</button>
        </form>
      )
    } else {
      content = (
        <div className='label'>
          <span className='label-color' style={{backgroundColor: cssColor}}>&nbsp;</span>
          <span>{label.name}</span>
          <span onClick={this.onEditClick} className='octicon octicon-pencil'></span>
          <span onClick={this.onDeleteClick} className='octicon octicon-x'></span>
        </div>
      )
    }

    return (
      <div>{content}</div>
    )
  }
})