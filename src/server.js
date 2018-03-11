import Express from 'express';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import path from 'path';
import PrettyError from 'pretty-error';
import http from 'http';

import routes from './serverRoutes.map'

const targetUrl = process.env.API_URL;
const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);


import request from 'superagent';

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

app.use(Express.static(path.join(__dirname, '..', 'static')));

routes.forEach((route) => {
    try {
      if (route.middleware) {
        route.middleware.forEach((func) => {
          app[route.method](route.path, func);
        });
      }
      if (route.handler) {
        app[route.method](route.path, route.handler);
      }
    } catch(e) {
      console.error('Error at route ', route, e);
    }
  });


if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
