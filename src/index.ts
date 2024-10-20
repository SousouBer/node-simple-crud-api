import http, { IncomingMessage, ServerResponse } from 'node:http';
import dotenv from 'dotenv';

import { getUsers } from './controllers/userController';
import { storeUser } from './controllers/userController';

dotenv.config();

const port = process.env.PORT || 3000;

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    if (req.url === '/api/users' && req.method === 'GET') {
      getUsers(req, res);
    } else if (req.url === '/api/users' && req.method === 'POST') {
      storeUser(req, res);
    }
  },
);

server.listen(3000, () => console.log(`Running on PORT ${port}!`));
