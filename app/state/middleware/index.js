import { applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import createLogger from 'redux-logger';

const isDevelopment = process.env.NODE_ENV !== 'production';
const storeEnhancers = [applyMiddleware(apiMiddleware)];

if (isDevelopment) {
  const loggerMiddleware = createLogger({
    collapsed: true,
    duration: true,
  });
  storeEnhancers.push(applyMiddleware(loggerMiddleware));
}

export default storeEnhancers;
