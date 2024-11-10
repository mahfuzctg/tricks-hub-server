import express from 'express';
import router from './routes';
import globalErrorHandler from './middlewares/globalErrorHandler';
import cors from 'cors';

const app = express();

// Define allowed origins
const allowedOrigins = [
  'https://tricks-hub-client.vercel.app',
  "https://tricks-hub-server.vercel.app",
  'http://localhost:3000', 
];

// Set up CORS to check against allowed origins
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin, like mobile apps or CURL requests
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
  })
);

// Use JSON body parser
app.use(express.json());

// Use router
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Welcome to tricks hub server!😄💖');
});

// Global error handler
app.use(globalErrorHandler);

app.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    statuscode: 404,
    message: 'Not found',
  });
});

export default app;
