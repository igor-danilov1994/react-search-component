import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { User } from 'types';

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async () => {
    try {
      const response = await axios.get<User[]>(`${BASE_URL}/users`);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
);


