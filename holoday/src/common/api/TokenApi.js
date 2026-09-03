import axios from "axios";

const TokenApi = axios.create({
   baseURL: "http://localhost:8080",
});

TokenApi.interceptors.request.use((config) => {
   const accessToken = localStorage.getItem("accessToken");

   if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
   }

   return config;
});

TokenApi.interceptors.response.use(
   (response) => {
      return response;
   },
   async (error) => {

      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {

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

            localStorage.setItem("userIsAdmin", response.data.userIsAdmin);
            localStorage.setItem("accessToken", newAccessToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;


            localStorage.setItem("userIsAdmin", response.data?.userIsAdmin);
            localStorage.setItem("accessToken", response.data?.accessToken);

            return TokenApi(originalRequest);
         } catch (refreshError) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userIsAdmin");

            return Promise.reject(refreshError);
         }
      }

      return Promise.reject(error);
   }
);

export default TokenApi;