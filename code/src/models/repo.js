import Model from 'ampersand-model'

export default Model.extend({

  // corresponds to Github API repo properties  
  props: {
    id: 'number',
    name: 'string',
    full_name: 'string'
  }
})