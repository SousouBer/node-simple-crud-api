import { validate } from 'uuid';

export const validateId = (id: string) => {
  return validate(id);
};
