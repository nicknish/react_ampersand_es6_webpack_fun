import Collection from 'ampersand-rest-collection'
import Repo from './repo'
import githubMixin from '../helpers/github-mixin'

export default Collection.extend(githubMixin, {
  url: 'https://api.github.com/user/repos',

  // pass single model into the collection
  model: Repo,

  getByFullName (fullName) {
    // findWhere runs a true/false check
    // to find an item in a list
    // using an object with match criteria
    let model = this.findWhere({
      full_name: fullName
    })

    if (!model) {
      model = new Repo({full_name: fullName})
    }

    model.fetch()

    return model
  }
})