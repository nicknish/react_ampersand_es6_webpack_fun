import React from 'react'
import ampersandMixin from 'ampersand-react-mixin'
import LabelItem from '../components/label-item'

export default React.createClass({
  mixins: [ampersandMixin],
  displayName: 'RepoDetail',

  onAddClick (event) {
    event.preventDefault()
    this.props.repo.labels.add({
      name: '',
      color: '',
      editing: true,
      saved: false
    },
      // Adds it to the top of the collection
      {at: 0})
  },

  render () {
    const {repo} = this.props

    return (
      <div className='container'>
        <h1>{repo.full_name}</h1>
        <p>
          <button onClick={this.onAddClick} className='button'>Add New Label</button>
        </p>
        <ul>
          {repo.labels.map((label) => {
            return <LabelItem key={label.name} label={label} />
          })}
        </ul>
      </div>
    )
  }
})