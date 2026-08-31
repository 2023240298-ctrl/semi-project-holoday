import axios from "axios";

const customAxios = axios.create({
   baseURL: "http://localhost:8080",
});

customAxios.interceptors.request.use((config) => {
   const accessToken = localStorage.getItem("accessToken");

   if(accessToken) {
      config.headers.Authorization=`Bearer ${accessToken}`;
   }

   return config;
});

export default customAxios;