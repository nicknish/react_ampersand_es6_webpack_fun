import Model from 'ampersand-model'
import githubMixin from '../helpers/github-mixin'

export default Model.extend(githubMixin, {
  // helps build the URL structure for CRUD operations
  idAttribute: 'name',

  props: {
    name: 'string',
    color: 'string'
  },

  session: {
    editing: {
      type: 'boolean',
      default: false
    }
  }
})