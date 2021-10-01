const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');

const history = require('connect-history-api-fallback');

const app = express();

const staticFileMiddleware = express.static('src');

app.use(staticFileMiddleware);

app.use(history({
  index: '/index.html'
}));

app.use(staticFileMiddleware);

app.use('/', serveStatic(path.join(__dirname, '/dist')));

const port = process.env.PORT || 8082;

app.all("*", (_req, res) => {
    try {
      res.sendFile('src/index.html');
    } catch (error) {
      res.json({ success: false, message: "Something went wrong" });
    }
  });

app.listen(port);

console.log('Server is up and running on port: ' + port);