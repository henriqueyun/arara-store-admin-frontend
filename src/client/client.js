import axios from 'axios';
import {
  ProductService,
  AuthService,
  ShippingService,
  OrderService,
} from './services';

function setAxiosConfig() {
  axios.defaults.baseURL = 'http://localhost:3000';
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async function clearLocalStorageAuth(error) {
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedUser');
        window.location.reload();
        return Promise.reject(error);
      }

      return Promise.reject(error);
    },
  );
}

const client = {
  products: ProductService(axios),
  auth: AuthService(axios),
  shipping: ShippingService(axios),
  order: OrderService(axios),
};

function setAuth(token) {
  axios.defaults.headers.Authorization = token;
}

setAxiosConfig();

export { client, setAuth };
