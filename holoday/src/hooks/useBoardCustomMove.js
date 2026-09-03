import { createSearchParams, useNavigate, useSearchParams } from "react-router";

const getQueryNumber = (param, defaultValue) => {
   if(!param) {
      return defaultValue;
   }

   return parseInt(param);
};

const useBoardCustomMove = () => {
   const navigate = useNavigate();
   const [queryParams] = useSearchParams();

   const page = getQueryNumber(queryParams.get("page"), 1);
   const size = getQueryNumber(queryParams.get("size"), 10);

   const queryDefault = createSearchParams({
      page: String(page),
      size: String(size),
   }).toString();

   const moveToList = (pageParam) => {
      let queryStr = queryDefault;

      if(pageParam) {
         const targetPage = getQueryNumber(pageParam.page, page);
         const targetSize = getQueryNumber(pageParam.size, size);

         queryStr = createSearchParams({
            page: String(targetPage),
            size: String(targetSize),
         }).toString();
      }

      navigate({
         pathname: "/holoboard",
         search: `?${queryStr}`,
      });
   };

   const moveToBoardHome = () => {
      navigate({
         pathname: "/holoboard",
      });
   };

   const moveToRegister = () => {
      navigate({
         pathname: "/holoboard/new",
      });
   };

   const moveToModify = (no) => {
      navigate({
         pathname: `/holoboard/edit/${no}`,
         search: `?${queryDefault}`,
      });
   };

   const moveToRead = (no) => {
      navigate({
         pathname: `/holoboard/${no}`,
         search: `?${queryDefault}`,
      });
   };

   return {moveToRegister, moveToList, moveToBoardHome, moveToModify, moveToRead, page, size,};
};

export default useBoardCustomMove;