import morgan from 'morgan';

// Custom token for request ID
morgan.token('reqId', (req) => req.id || 'unknown');

// Custom token for request body
morgan.token('body', (req) => {
  if (req.method === 'GET' || !req.body) return '';
  return JSON.stringify(req.body, null, 2);
});

// Custom token for response body
morgan.token('resBody', (req, res) => {
  if (!res.body) return '';
  return JSON.stringify(res.body, null, 2);
});

// Custom format with timestamps and request/response bodies
const apiFormat = ':remote-addr - :method :url :status :response-time ms - :reqId\n' +
  'Request Body:\n:body\n' +
  'Response Body:\n:resBody\n';

// Only log API requests
const apiLogger = morgan(apiFormat, {
  skip: (req) => !req.url.startsWith('/api'),
  stream: {
    write: (message) => {
      console.log(`🔍 API Request: ${message}`);
    }
  }
});

export default apiLogger;
