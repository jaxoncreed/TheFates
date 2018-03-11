export default function clientMiddleware(client) {
    return ({dispatch, getState}) => {
      return next => action => {
        if (typeof action === 'function') {
          return action(dispatch, getState);
        }
        const { promise, types, ...rest } = action; // eslint-disable-line no-redeclare
        if (!promise) {
          return next(action);
        }
        const [REQUEST, SUCCESS, FAILURE] = types;
        next({...rest, type: REQUEST});
        let actionPromise = promise(client);
        actionPromise.then(
          (result) => { next({...rest, result: result.body, headers: result.headers, type: SUCCESS}) },
          (error) => {
            next({
              ...rest,
              result: error,
              error: error.errors || { 'server': 'server error' },
              type: FAILURE
            });
          }
        );
        if (process.env.NODE_ENV !== "production") {
          actionPromise = actionPromise.catch((error)=> {
            console.error('MIDDLEWARE ERROR:', error.stack || error);
            next({...rest, error: { app: 'application error'}, type: FAILURE});
          });
        }
  
        return actionPromise;
      };
    };
  }
  