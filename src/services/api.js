import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getLocais = () => api.get('/locais');
export const getLocalById = (id) => api.get(`/locais/${id}`);
export const addLocal = (local) => api.post('/locais', local);
export const updateLocal = (id, local) => api.put(`/locais/${id}`, local);
export const deleteLocal = (id) => api.delete(`/locais/${id}`);
export const getEventos = () => api.get('/eventos');
export const getEventoById = (id) => api.get(`/eventos/${id}`);
export const addEvento = (evento) => api.post('/eventos', evento);
export const updateEvento = (id, evento) => api.put(`/eventos/${id}`, evento);
export const deleteEvento = (id) => api.delete(`/eventos/${id}`);