
const routes = [
  {
  	method: 'get',
  	path: '/api/assignment',
  	handler: require('./serverHandlers/getAllAssignments.handler.js')
  },
  {
    method: 'get',
    path: '/api/assignment/:id',
    handler: require('./serverHandlers/getOneAssignment.handler.js')
  },
  {
    method: 'get',
    path: '/*',
    handler: require('./serverHandlers/render.handler.js')
  }
]

export default routes;
