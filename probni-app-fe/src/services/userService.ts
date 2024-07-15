import { User } from '@prisma/client';
import axios from 'axios';

export const getUsers = async ({
  page,
  pageSize,
  field,
  sort,
  column,
  operator,
  value,
}: GetUserParams): Promise<{ users: User[]; total: number }> => {
  try {
    const response = await axios.get('/api/user', {
      params: { page, pageSize, field, sort, column, operator, value },
    });
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getUser = async (userId: string): Promise<User> => {
  try {
    const response = await axios.get(`/api/user/${userId}`);
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
