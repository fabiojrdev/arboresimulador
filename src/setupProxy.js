const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://hooks.zapier.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // remove /api da URL
      },
    })
  );
};
