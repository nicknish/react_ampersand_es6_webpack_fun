import Model from 'ampersand-model'
import githubMixin from '../helpers/github-mixin'
import LabelCollection from './label-collection'

export default Model.extend(githubMixin, {
  url () {
    return 'https://api.github.com/repos/' + this.full_name
  },

  // corresponds to Github API repo properties  
  props: {
    id: 'number',
    name: 'string',
    full_name: 'string'
  },

  derived: {
    appUrl: {
      // if the full_name changes
      // it will rerun this fn()
      deps: ['full_name'],
      fn () {
        return '/repo/' + this.full_name
      }
    }
  },

  collections: {
    // Connect label collection to the repo model
    labels: LabelCollection
  },

  fetch () {
    Model.prototype.fetch.apply(this, arguments)
    this.labels.fetch()
  }
})