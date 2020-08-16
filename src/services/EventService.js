import axios from 'axios';
import store from '../store/store'; // path to your Vuex store

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});
apiClient.interceptors.request.use((config) => {
  store.dispatch('loading/startLoading');
  return config;
});
apiClient.interceptors.response.use(
  (response) => {
    store.dispatch('loading/doneLoading');
    return response;
  },
  () => {
    // handle error
    store.dispatch('loading/doneLoading');
  },
);

export default {
  getEvents(perPage, page) {
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page);
  },
  getEvent(id) {
    return apiClient.get('/events/' + id);
  },
  postEvent(event) {
    return apiClient.post('/events', event);
  },
};
