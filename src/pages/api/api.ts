import axios from 'axios'
import { Login, Join, Check } from '@/types/api'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const login = async ({ email, password }: Login) => {
  try {
    const res = await api.post('/login', { email, password });
    return res;
  } catch (error) {
    throw error;
  }
};

const join = async ({ email, password, tel, username }: Join) => {
  try {
    const res = await api.post('/join', { email, password, tel, username });
    return res;
  } catch (error) {
    throw error;
  }
};

const check = async ({ email }: Check) => {
  try {
    const res = await api.get(`/check?email=${email}`);
    return res;
  } catch (error) {
    throw error;
  }
};

export { login, join, check };