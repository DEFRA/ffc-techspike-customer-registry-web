const routes = [].concat(
  require('../routes/assets'),
  require('../routes/cookies'),
  require('../routes/dashboard'),
  require('../routes/grants-funding'),
  require('../routes/search-customers'),
  require('../routes/history'),
  require('../routes/grant'),
  require('../routes/payment'),
  require('../routes/healthy'),
  require('../routes/healthz'),
  require('../routes/index')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, _) => {
      server.route(routes)
    }
  }
}
