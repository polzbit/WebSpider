const { createProxyMiddleware } = require('http-proxy-middleware')
const DEV_SERVER = 'localhost:5000'

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `http://${DEV_SERVER}`,
      logLevel: 'debug',
      secure: false,
    }),
  )

  // app.use(
  //   createProxyMiddleware('/ws', {
  //     target: `ws://${DEV_SERVER}`,
  //     ws: true,
  //   }),
  // )
}
