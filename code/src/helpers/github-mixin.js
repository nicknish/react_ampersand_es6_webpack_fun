import app from 'ampersand-app'

export default {

  ajaxConfig () {
    console.log(app.me.token)

    return {
      headers: {
        Authorization: 'token ' + app.me.token
      }
    }
  }
}