import Model from 'ampersand-model'
import githubMixin from '../helpers/github-mixin'
import xhr from 'xhr'

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
  },

  update (attributes) {
    
    const oldAttributes = this.getAttributes({props: true, session: false})

    xhr({
      // based off of parent collection url()
      url: this.url(),
      json: attributes,
      method: 'PATCH',
      headers: {
        'Authorization': 'token ' + app.me.token
      }
    }, (err, req, body) => {
      // if error out, revert back
      if (err) {
        this.set(oldAttributes)
        console.log('something went wrong, check your wifi')
      }
    })
    this.set(attributes)
  }
})