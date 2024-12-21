import { ref } from 'vue';

// Variável global de autenticação.
export const isAuthenticated = ref(!!localStorage.getItem('token'));

export const setAuthenticated = (value) => {
  isAuthenticated.value = value;
};
