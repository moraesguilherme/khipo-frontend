import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5185/api',
});

export const getLocais = (pageNumber = 1, pageSize = 5) => api.get(`/Locais/all?pageNumber=${pageNumber}&pageSize=${pageSize}`)
  .then(response => response.data);
export const searchLocais = (nome, pageNumber = 1, pageSize = 5) => api.get(`/Locais/filtered?nome=${nome}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
export const getLocalById = (id) => api.get(`/locais/${id}`);
export const addLocal = (local) => api.post('/Locais', local);
export const updateLocal = (id, local) => api.put(`/locais/${id}`, local);
export const deleteLocal = (id) => api.delete(`/locais/${id}`);
export const getEventos = () => api.get('/Eventos/all');
export const getEventoById = (id) => api.get(`/eventos/${id}`);
export const addEvento = (evento) => api.post('/eventos', evento);
export const updateEvento = (id, evento) => api.put(`/eventos/${id}`, evento);
export const deleteEvento = (id) => api.delete(`/eventos/${id}`);
export const searchEventos = (nome, pageNumber = 1, pageSize = 5) => api.get(`/Eventos/filtered?nome=${nome}&pageNumber=${pageNumber}&pageSize=${pageSize}`);