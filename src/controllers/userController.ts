import { IncomingMessage, ServerResponse } from 'http';

import { User } from './models/userModel';

export const getUsers = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const users = await User.getUsers();

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

      const newUser = new User(username, age, hobbies);
      newUser.store();

      res.writeHead(201, { 'Content-type': 'Application/json' });
      res.end(JSON.stringify(newUser));
    });
  } catch (error) {
    res.writeHead(500, { 'Content-type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
};

export const getUser = async (
  req: IncomingMessage,
  res: ServerResponse,
  userId: string,
) => {
  try {
    const user = await User.getUser(userId as string);

    res.writeHead(200, { 'Content-type': 'Application/json' });
    res.end(JSON.stringify(user));
  } catch (error) {
    res.writeHead(500, { 'Content-type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
};

export const updateUser = async (
  req: IncomingMessage,
  res: ServerResponse,
  userId: string,
) => {
  try {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const { username, age, hobbies } = JSON.parse(body);

      const updatedUser = await User.updateUser(userId, {
        username,
        age,
        hobbies,
      });

      res.writeHead(200, { 'Content-type': 'Application/json' });
      res.end(JSON.stringify(updatedUser));
    });
  } catch (error) {
    res.writeHead(500, { 'Content-type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
};
