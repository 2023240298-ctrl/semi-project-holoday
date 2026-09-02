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

customAxios.interceptors.response.use(
   (response) => {
      return response;
   },
   async (error) => {

      const originalRequest = error.config;

      if(error.response?.status === 401 && !originalRequest._retry) {

         originalRequest._retry = true;

         try {
            const refreshToken = localStorage.getItem("refreshToken");

            const response = await axios.post(
               "http://localhost:8080/api/holoday/refresh",
               {
                  refreshToken: refreshToken
               }
            );

            const newAccessToken = response.data.accessToken;

            localStorage.setItem("accessToken", newAccessToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return customAxios(originalRequest);
         } catch (refreshError) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            return Promise.reject(refreshError);
         }
      }

      return Promise.reject(error);
   }
);

export default customAxios;