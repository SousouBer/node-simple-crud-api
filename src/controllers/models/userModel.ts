import { users } from '../../db/users';
import { User } from '../../types/types';
import { v4 as uuidv4 } from 'uuid';

export const usersIndex = () => {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
};

export const createUser = (user: User) => {
  return new Promise((resolve, reject) => {
    const newUser = {
      id: uuidv4(),
      ...user,
    };

    users.push(newUser);
    resolve(newUser);
  });
};
