import { users } from '../../db/users';
import { UserType } from '../../types/types';
import { v4 as uuidv4 } from 'uuid';

export class User {
  readonly id: string;

  constructor(
    public username: string,
    public age: number,
    public hobbies: string[],
  ) {
    this.id = uuidv4();
    this.username = username;
    this.age = age;
    this.hobbies = hobbies;
  }

  static getUsers(): Promise<UserType[]> {
    return new Promise((resolve, reject) => {
      resolve(users);
    });
  }

  store(): Promise<UserType> {
    return new Promise((resolve, reject) => {
      try {
        users.push(this);
        resolve(this);
      } catch (error) {
        reject(error);
      }
    });
  }

  static getUser(id: string): Promise<UserType> {
    return new Promise((resolve, reject) => {
      try {
        const user = users.find((user) => user.id === id);

        resolve(user as UserType);
      } catch (error) {
        reject(error);
      }
    });
  }

  static updateUser(id: string, data: Partial<UserType>): Promise<UserType> {
    return new Promise((resolve, reject) => {
      try {
        const userIndex = users.findIndex((user) => user.id === id);

        if (userIndex === -1) {
          reject(new Error('User not found'));
          return;
        }

        users[userIndex] = { ...users[userIndex], ...data };

        resolve(users[userIndex]);
      } catch (error) {
        reject(error);
      }
    });
  }

  static destroyUser(id: string): Promise<UserType> {
    return new Promise((resolve, reject) => {
      try {
        const userIndex = users.findIndex((user) => user.id === id);

        if (userIndex === -1) {
          reject(new Error('User not found'));
          return;
        }

        const removedUser = users.splice(userIndex, 1)[0];

        resolve(removedUser);
      } catch (error) {
        reject(error);
      }
    });
  }
}
