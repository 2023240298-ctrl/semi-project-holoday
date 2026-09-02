import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import useBoardCustomMove from "../../hooks/useBoardCustomMove";
import { postAdd, getCategoryList } from "../js/HoloBoardApi";

const accessToken = localStorage.getItem("accessToken");

const userId = accessToken
   ? JSON.parse(atob(accessToken.split(".")[1])).sub
   : "";

const initState = {
   categoryNo: "",
   boardDate: new Date().toISOString().split("T")[0],
   userId: userId,
   boardTitle: "",
   boardContent: "",
   boardScontent: "",
   boardImg: "",
   boardSimg: "",
};

const AddComponent = () => {
   const [holoLounge, setHoloLounge] = useState(initState);
   const [categories, setCategories] = useState([]);
   useEffect(() => {
      getCategoryList()
         .then((data) => {
            console.log("카테고리:", data);
            setCategories(data);
         })
         .catch((e) => {
            console.error("카테고리 조회 오류:",e);
         });
   }, []);
   const {moveToList} = useBoardCustomMove();
   
   const navigate = useNavigate();

   const handleChangeHoloLounge = (e) => {
      const {name, value} = e.target;

      setHoloLounge((prevHoloLounge) => ({
         ...prevHoloLounge,
         [name]: value,
      }));
   };

   const handleClickAdd = () => {
      postAdd(holoLounge)
      .then(result => {
         console.log(result);
         navigate(`/holoboard/${result.boardNo}`);
      }).catch(e => {
         console.error(e)
      });
   };

   return (
      <div>
         <div className="mx-auto w-3/4 rounded-lg border border-blue-100 bg-white p-8">
            <div className="mb-5">
               <label className="holo-text mb-2 block text-sm text-blue-800">
                  카테고리
               </label>

               <select
                  name="categoryNo"
                  value={holoLounge.categoryNo}
                  onChange={handleChangeHoloLounge}
                  className="w-full rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-gray-700 outline-none 
                  focus:border-blue-300 focus:ring-2 focus:ring-blue-200"
               >
                  <option
                     value=""
                     className="bg-blue-50 text-gray-700"
                  >
                     카테고리를 선택하세요
                  </option>

                  {categories.map((category) => (
                     <option
                        key={category.categoryNo}
                        value={category.categoryNo}
                     >
                        {category.categoryName}
                     </option>
                  ))}
               </select>
            </div>

            <div>
               <label className="holo-text mb-2 block text-sm text-blue-800">
                  작성일
               </label>

               <input
                  type="text"
                  name="boardDate"
                  value={holoLounge.boardDate}
                  readOnly
                  className="w-full rounded-lg border border-blue-100 bg-gray-50 px-4 py-3
                  text-sm text-gray-500 outline-none"
                  onChange={handleChangeHoloLounge}
               />
            </div>

            <div>
               <label className="holo-text mb-2 block text-sm text-blue-800">
                  아이디
               </label>

               <input
                  type="text"
                  name="userId"
                  value={holoLounge.userId}
                  readOnly
                  className="w-full rounded-lg border border-blue-100 bg-gray-50 px-4 py-3 text-sm
                  text-gray-500 outline-none"
                  onChange={handleChangeHoloLounge}
               />
            </div>

            <div>
               <label className="holo-text mb-2 block text-sm text-blue-800">
                  제목
               </label>

               <input
                  type="text"
                  name="boardTitle"
                  value={holoLounge.boardTitle}
                  className="w-full rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-gray-700 outline-none 
                  focus:border-blue-300 focus:ring-2 focus:ring-blue-200"
                  onChange={handleChangeHoloLounge}
               />
            </div>

            <div>
               <label className="holo-text mb-2 block text-sm text-blue-800">
                  내용
               </label>

               <input
                  type="text"
                  name="boardContent"
                  value={holoLounge.boardContent}
                  className="w-full resize-none rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-gray-700 outline-none 
                  focus:border-blue-300 focus:ring-2 focus:ring-blue-200"
                  onChange={handleChangeHoloLounge}
               />
            </div>

            <div>
               <label className="holo-text mb-2 block text-sm text-blue-800">
                  서브내용
               </label>

               <input
                  type="text"
                  name="boardScontent"
                  value={holoLounge.boardScontent}
                  placeholder="내용을 입력해 주세요."
                  className="w-full resize-none rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-gray-700 outline-none 
                  focus:border-blue-300 focus:ring-2 focus:ring-blue-200"
                  onChange={handleChangeHoloLounge}
               />
            </div>

            <div>
               <label className="holo-text mb-2 block text-sm text-blue-800">
                  이미지
               </label>

               <input
                  type="text"
                  name="boardImg"
                  value={holoLounge.boardImg}
                  className="w-full rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-gray-700 outline-none 
                  focus:border-blue-300 focus:ring-2 focus:ring-blue-200"
                  onChange={handleChangeHoloLounge}
               />
            </div>

            <div>
               <label>썸네일</label>
               <input
                  type="text"
                  name="boardSimg"
                  value={holoLounge.boardSimg}
                  onChange={handleChangeHoloLounge}
               />
            </div>
         </div>

         <button
            type="button"
            onClick={moveToList}
         >
            목록으로
         </button>

         <button
            type="button"
            onClick={handleClickAdd}
         >
            글쓰기
         </button>
      </div>
   );
};

export default AddComponent;