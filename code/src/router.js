import app from 'ampersand-app'
import Router from 'ampersand-router'
import React from 'react'
import qs from 'qs'
import xhr from 'xhr'
import PublicPage from './pages/public'
import ReposPage from './pages/repos'
import RepoDetail from './pages/repo-detail'
import MessagePage from './pages/message'
import Layout from './layout'
import NavHelper from './components/nav-helper'

function requiresAuth (handlerName) {
  // app.me.token does not exist yet at instantiatin
  // but when the function is returned by the router
  return function () {
    if (app.me.token) {
      this[handlerName].apply(this, arguments)
    } else {
     this.redirectTo('/')
    }
  }
}

export default Router.extend({

  renderPage (page, opts = {layout: true}) {
    if (opts.layout) {
      page = (
        <Layout me={app.me}>
          {page}
        </Layout>
      )
    }

    React.render(page, document.body);
  },
  
  routes: {
    // name : // corresponding handler fn
    '': 'public',
    'repos': requiresAuth('repos'),
    'login': 'login',
    'logout': 'logout',
    'repo/:owner/:name': requiresAuth('repoDetail'),
    'auth/callback?:query': 'authCallback',
    // wildcard
    '*fourOhfour': 'fourOhfour'
  },

  public () {
    this.renderPage(<PublicPage/>, {layout: false})
  },

  repos () {
    this.renderPage(<ReposPage repos={app.me.repos}/>)
  },

  repoDetail (owner, name) {
    const model = app.me.repos.getByFullName(owner + '/' + name)
    this.renderPage(<RepoDetail repo={model} labels={model.labels} />)
  },

  login () {
    window.location = 'https://github.com/login/oauth/authorize?' + qs.stringify({
      scope: 'user,repo',
      redirect_uri: window.location.origin + '/auth/callback',
      client_id: 'f8dd69187841cdd22a26'
    });
  },

  authCallback (query) {
    query = qs.parse(query)

    xhr({
      // we're inputting our client secret in heroku
      // allowing us to hide our client_secret
      url: 'https://labelr-localhost.herokuapp.com/authenticate/' + query.code,
      json: true
    }, (err, req, body) => {
      app.me.token = body.token
      // replaces the history using internal navigation
      this.redirectTo('/repos')
    })

    this.renderPage(<MessagePage title='Fetching your data' />)
  },

  logout () {
    window.localStorage.clear()
    window.location = '/'
  },

  fourOhfour () {
    this.renderPage(<MessagePage title='Not Found' body='sorry nothing here'/>)
  }
})