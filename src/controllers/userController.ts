import { IncomingMessage, ServerResponse } from 'http';

import { validateId } from '../utils/validateUserId';
import { isValidBody } from '../utils/validateUserData';

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
      if (!isValidBody(JSON.parse(body))) {
        res.writeHead(400, { 'Content-type': 'Application/json' });
        res.end(
          JSON.stringify({
            message: 'Body does not contain valid fields or data',
          }),
        );
        return;
      }

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
    if (!validateId(userId)) {
      res.writeHead(400, { 'Content-type': 'Application/json' });
      res.end(
        JSON.stringify({
          message: 'User UUID is invalid',
        }),
      );
      return;
    }

    const user = await User.getUser(userId as string);

    res.writeHead(200, { 'Content-type': 'Application/json' });
    res.end(JSON.stringify(user));
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === 'User not found') {
        res.writeHead(404, { 'Content-type': 'Application/json' });
        res.end(JSON.stringify({ error: 'User not found' }));
      } else {
        res.writeHead(500, { 'Content-type': 'application/json' });
        res.end(
          JSON.stringify({
            error: 'Internal Server Error',
            message: error.message,
          }),
        );
      }
    } else {
      res.writeHead(500, { 'Content-type': 'application/json' });
      res.end(JSON.stringify({ error: 'An unexpected error occurred' }));
    }
  }
};

export const updateUser = async (
  req: IncomingMessage,
  res: ServerResponse,
  userId: string,
) => {
  try {
    if (!validateId(userId)) {
      res.writeHead(400, { 'Content-type': 'Application/json' });
      res.end(
        JSON.stringify({
          message: 'User UUID is invalid',
        }),
      );
      return;
    }

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
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === 'User not found') {
        res.writeHead(404, { 'Content-type': 'Application/json' });
        res.end(JSON.stringify({ error: 'User not found' }));
      } else {
        res.writeHead(500, { 'Content-type': 'application/json' });
        res.end(
          JSON.stringify({
            error: 'Internal Server Error',
            message: error.message,
          }),
        );
      }
    } else {
      res.writeHead(500, { 'Content-type': 'application/json' });
      res.end(JSON.stringify({ error: 'An unexpected error occurred' }));
    }
  }
};

export const destroyUser = async (
  req: IncomingMessage,
  res: ServerResponse,
  userId: string,
) => {
  try {
    if (!validateId(userId)) {
      res.writeHead(400, { 'Content-type': 'Application/json' });
      res.end(
        JSON.stringify({
          message: 'User UUID is invalid',
        }),
      );
      return;
    }

    const removedUser = await User.destroyUser(userId);

    res.writeHead(200, { 'Content-type': 'Application/json' });
    res.end(
      JSON.stringify({
        message: 'User removed successfully',
      }),
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === 'User not found') {
        res.writeHead(404, { 'Content-type': 'Application/json' });
        res.end(JSON.stringify({ error: 'User not found' }));
      } else {
        res.writeHead(500, { 'Content-type': 'application/json' });
        res.end(
          JSON.stringify({
            error: 'Internal Server Error',
            message: error.message,
          }),
        );
      }
    } else {
      res.writeHead(500, { 'Content-type': 'application/json' });
      res.end(JSON.stringify({ error: 'An unexpected error occurred' }));
    }
  }
};
