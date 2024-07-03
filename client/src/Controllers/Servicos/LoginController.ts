import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Altere para a URL do seu servidor
});

export const GetUsuarios = async () => {
  try {
    const response = await api.get('/api/usuarios');
    return response.data;
  } catch (error) {
    console.error('Error fetching data', error);
    throw error;
  }
};
