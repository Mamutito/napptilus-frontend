import axios from 'axios';
import { Phone } from '../types/Phone';

const API_URL = 'https://prueba-tecnica-api-tienda-moviles.onrender.com';

export const getPhones = async (): Promise<Phone[]> => {
  const response = await axios.get(`${API_URL}/phones`);
  return response.data;
};