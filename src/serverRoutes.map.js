
const routes = [
  {
    method: 'get',
    path: '/*',
    handler: require('./serverHandlers/render.handler.js')
  }
];

export default routes;
