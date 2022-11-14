const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(createProxyMiddleware(
    '/api', {
      target: 'https://api-production-7385.up.railway.app/',
      changeOrigin: true,
    })
  );
};