import Collection from 'ampersand-rest-collection'
import Label from './label'
import githubMixin from '../helpers/github-mixin'

export default Collection.extend(githubMixin, {
  // build URL /repos/user/repo/labels
  url () {
    // this.parent connects parent model
    return this.parent.url() + '/labels'
  },

  // Connect label to the label collection model
  model: Label
})
