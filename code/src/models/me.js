import Model from 'ampersand-model'
import RepoCollection from './repo-collection'
import githubMixin from '../helpers/github-mixin'

export default Model.extend(githubMixin, {
  url: 'https://api.github.com/user',

  initialize () {
    this.token = window.localStorage.token
    this.on('change:token', this.onTokenChange)
  },

  props: {
    id: 'number',
    login: 'string',
    avatar_url: 'string'
  },

  session: {
    token: 'string'
  },

  collections: {
    // associate repos with me model
    repos: RepoCollection
  },

  onTokenChange () {
    window.localStorage.token = this.token  
    this.fetchInitialData()
  },

  fetchInitialData () {
    if (this.token) {
      // automatically fetch user and repos onload
      this.fetch()
      this.repos.fetch()
    }
  }
})