const apiUrl = import.meta.env.DEV
  ? import.meta.env.VITE_BASE_URL
  : import.meta.env.VITE_PROD_API_URL;

export default apiUrl;
