import Axios from 'axios';

const api = Axios.create({
  baseURL: 'http://localhost:3001', // Altere para a URL do seu servidor
});

const API = {
  api,
};

export default API;