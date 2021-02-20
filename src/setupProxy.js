const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(createProxyMiddleware('/api/weather', {
    target: 'https://api.seniverse.com/v3/weather/now.json',
    changeOrigin: true,
    pathRewrite: {
      '^/api/weather': ''
    }
  }))
}