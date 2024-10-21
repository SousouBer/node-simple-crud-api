import type { UserType } from '../types/types';

export const isValidBody = (userData: unknown): userData is UserType => {
  if (typeof userData !== 'object' || userData === null) {
    return false;
  }

  const validKeys = ['username', 'age', 'hobbies'];

  for (const [key, value] of Object.entries(userData)) {
    if (!validKeys.includes(key)) {
      return false;
    }

    switch (key) {
      case 'username':
        if (typeof value !== 'string') return false;
        break;
      case 'age':
        if (typeof value !== 'number') return false;
        break;
      case 'hobbies':
        if (
          !Array.isArray(value) ||
          !value.every((hobby) => typeof hobby === 'string')
        ) {
          return false;
        }
        break;
      default:
        return false;
    }
  }

  if (Object.keys(userData).length !== validKeys.length) {
    return false;
  }

  return true;
};
