import http, { IncomingMessage, ServerResponse } from 'node:http';
import dotenv from 'dotenv';

import {
  destroyUser,
  getUser,
  getUsers,
  updateUser,
} from './controllers/userController';
import { storeUser } from './controllers/userController';
import { extractUserId } from './utils/extractUserId';

dotenv.config();

const port = process.env.PORT || 3000;

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    if (req.url === '/api/users' && req.method === 'GET') {
      getUsers(req, res);
    } else if (req.url === '/api/users' && req.method === 'POST') {
      storeUser(req, res);
    } else if (req.url?.startsWith('/api/users') && req.method === 'GET') {
      const userId = extractUserId(req.url as string);

      if (userId) {
        getUser(req, res, userId);
      }
    } else if (req.url?.startsWith('/api/users') && req.method === 'PUT') {
      const userId = extractUserId(req.url as string);

      if (userId) {
        updateUser(req, res, userId);
      }
    } else if (req.url?.startsWith('/api/users') && req.method === 'DELETE') {
      const userId = extractUserId(req.url as string);

      if (userId) {
        destroyUser(req, res, userId);
      }
    }
  },
);

server.listen(3000, () => console.log(`Running on PORT ${port}!`));
