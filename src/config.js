const apiUrl = import.meta.env.VITE_NODE_ENV === 'development' 
               ? import.meta.env.VITE_REACT_APP_BASE_URL
               : import.meta.env.VITE_REACT_APP_PROD_API_URL;

export default apiUrl;

