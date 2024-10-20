import { IncomingMessage, ServerResponse } from 'http';
import { usersIndex } from './models/userModel';
import { createUser } from './models/userModel';

export const getUsers = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const users = await usersIndex();

    res.writeHead(200, { 'Content-type': 'Application/json' });
    res.end(JSON.stringify(users));
  } catch (error) {
    res.writeHead(500, { 'Content-type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
};

export const storeUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const { username, age, hobbies } = JSON.parse(body);

      const createdUser = { username, age, hobbies };

      const storeUserToDB = await createUser(createdUser);

      res.writeHead(201, { 'Content-type': 'Application/json' });
      res.end(JSON.stringify(createdUser));
    });
  } catch (error) {
    res.writeHead(500, { 'Content-type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
};
