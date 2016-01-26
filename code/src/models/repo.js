import Model from 'ampersand-model'

export default Model.extend({

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
  }
})