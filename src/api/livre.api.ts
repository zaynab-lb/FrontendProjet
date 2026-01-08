import api from './axios';
import { Book } from '../types/Book';

export const LivreAPI = {
  getAll: async (): Promise<Book[]> => {
    const response = await api.get('/v1/livres');
    return response.data;
  },

  getById: async (id: number): Promise<Book> => {
    const response = await api.get(`/v1/livres/${id}`);
    return response.data;
  },

  create: async (data: FormData) => {
    const response = await api.post('/v1/livres', data);
    return response.data;
  },

  search: async (params: any): Promise<Book[]> => {
    const response = await api.get('/v1/livres/search', { params });
    return response.data;
  },
};
