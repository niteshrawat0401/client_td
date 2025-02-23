const apiUrl = import.meta.env.VITE_ENV === 'production' 
               ? import.meta.env.VITE_PROD_API_URL
               : import.meta.env.VITE_BASE_URL;

export default apiUrl;