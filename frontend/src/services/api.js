import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      return Promise.reject({ error: 'Request timeout. Please try again.' });
    }
    
    if (error.response) {
      return Promise.reject({
        error: error.response.data?.message || error.response.data?.error || `Server error: ${error.response.status}`,
        status: error.response.status,
      });
    }
    
    if (error.request) {
      return Promise.reject({ 
        error: 'Cannot connect to server. Please check if the backend is running.' 
      });
    }
    
    return Promise.reject({ error: error.message });
  }
);

export const studentService = {
  getAll: () => api.get('/students'),
  getById: (id) => {
    if (!id) throw new Error('Student ID is required');
    return api.get(`/students/${id}`);
  },
  create: (data) => api.post('/students', data),
  update: (id, data) => {
    if (!id) throw new Error('Student ID is required');
    return api.put(`/students/${id}`, data);
  },
  delete: (id) => {
    if (!id) throw new Error('Student ID is required');
    return api.delete(`/students/${id}`);
  },
  getStatistics: () => api.get('/students/statistics'),
};

export default api;