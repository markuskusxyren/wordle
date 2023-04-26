const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://github.com/markuskusxyren/wordle',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/markuskusxyren/wordle/blob/main/data',
      },
    })
  );
};
