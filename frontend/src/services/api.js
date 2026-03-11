import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const bookService = {
  getAll: () => api.get('/books'),
  getById: (id) => api.get(`/books/${id}`),
  save: (book) => api.post('/books', book),
  update: (id, book) => api.put(`/books/${id}`, book),
  delete: (id) => api.delete(`/books/${id}`),
  search: (query) => api.get(`/books/search?query=${query}`),
};

export const userService = {
  getAll: () => api.get('/users'),
  save: (user) => api.post('/users', user),
  delete: (id) => api.delete(`/users/${id}`),
};

export const issueService = {
  getIssued: () => api.get('/issues'),
  issue: (data) => api.post('/issues/issue', data),
  return: (id) => api.post(`/issues/return/${id}`),
};

export default api;
