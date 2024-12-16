const { createProxyMiddleware } = require('http-proxy-middleware');

const target = 'http://backend:3003'; // Prueba directamente esto

module.exports = function(app) {
  app.use(createProxyMiddleware(
    '/api', {
      target: target,
      changeOrigin: true,
    })
  );
};