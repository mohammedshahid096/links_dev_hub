const API_URLS = {
  API_SERVER: process.env.NEXT_PUBLIC_BACKEND_SERVER ? `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/v1` :"http://localhost:8000/api/v1",
  API_SERVER_BASE_URL: process.env.NEXT_PUBLIC_BACKEND_SERVER ? `${process.env.NEXT_PUBLIC_BACKEND_SERVER}`: "http://localhost:8000",
};

export default API_URLS;
