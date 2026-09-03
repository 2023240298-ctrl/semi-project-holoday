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
   const [file, setFile] = useState(null);

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

   const handleChangeFile = (e) => {
      setFile(e.target.files[0]);
   };

   const handleClickAdd = () => {
      
      postAdd(holoLounge, file)
      .then(result => {
         console.log(result);
         navigate(`/holoboard/${result.boardNo}`);
      }).catch(e => {
         console.error(e)
      });
   };

   return (
      <div>
         <form
            onSubmit={(e) => {
               e.preventDefault();
               handleClickAdd();
            }}
         >
            <div className="mx-auto w-3/4 rounded-lg border border-blue-100 bg-white p-8">
               <div className="mb-5 flex justify-end">
                  <button
                     type="button"
                     onClick={moveToList}
                     className="holo-text border border-orange-300 px-2 py-1 text-xl text-orange-500 hover:bg-orange-50">
                        X
                     </button>
               </div>

               <div className="mb-5">
                  <select
                     name="categoryNo"
                     value={holoLounge.categoryNo}
                     onChange={handleChangeHoloLounge}
                     required
                     className="holo-text w-40 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-gray-500 outline-none
                     focus:border-blue-300 focus:ring-2 focus:ring-blue-200"
                  >
                     <option
                        value=""
                        className="head-text bg-blue-50 text-gray-700"
                     >
                        카테고리
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

               <div className="mb-5 flex items-end justify-between">
                  <div className="w-40">
                     <label className="head-text mb-2 block text-sm text-blue-800">
                        아이디
                     </label>

                     <input
                        type="text"
                        name="userId"
                        value={holoLounge.userId}
                        readOnly
                        className="holo-text w-full rounded-lg border border-blue-100 bg-gray-50 px-4 py-3 text-sm
                        text-gray-500 outline-none"
                        onChange={handleChangeHoloLounge}
                     />
                  </div>

                  <div className="w-40">
                     <label className="head-text mb-2 block text-sm text-blue-800">
                        작성일
                     </label>

                     <input
                        type="text"
                        name="boardDate"
                        value={holoLounge.boardDate}
                        readOnly
                        className="holo-text w-full rounded-lg border border-blue-100 bg-gray-50 px-4 py-3 text-right text-sm
                        text-gray-500 outline-none"
                        onChange={handleChangeHoloLounge}
                     />
                  </div>
               </div>

               <div className="mb-8">
                  <label className="head-text mb-2 block text-sm text-blue-800">
                     제목
                  </label>

                  <input
                     type="text"
                     name="boardTitle"
                     value={holoLounge.boardTitle}
                     className="holo-text w-full rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-gray-700 outline-none 
                     focus:border-blue-300 focus:ring-2 focus:ring-blue-200"
                     onChange={handleChangeHoloLounge}
                     required
                  />
               </div>

               <div className="mt-5 mb-8">
                  <textarea
                     type="text"
                     name="boardContent"
                     value={holoLounge.boardContent}
                     placeholder="내용을 입력해 주세요."
                     className="holo-text h-64 w-full resize-none rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-500 outline-none
                     focus:border-blue-300 focus:ring-2 focus:ring-blue-200"
                     onChange={handleChangeHoloLounge}
                     required
                  />
               </div>

               <div>
                  <div className="flex items-center gap-3">
                     <div className="flex-1 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-gray-500">
                        {file ? file.name : "이미지"}
                     </div>

                     <label className="head-text cursor-pointer rounded-lg bg-blue-400 px-5 py-3 text-sm font-medium text-white hover:bg-blue-500">
                        이미지 선택
                        <input
                           type="file"
                           name="file"
                           accept=".jpg,.jpeg,.png"
                           className="hidden"
                           onChange={handleChangeFile}
                        />
                     </label>
                  </div>
               </div>
            </div>

            <div className="mx-auto flex w-3/4 justify-end gap-3 pt-4">
               <button
                  type="submit"
                  className="rounded-lg border border-sky-300 bg-sky-100 px-5 py-3 text-base
                  font-semibold text-sky-700 hover:bg-sky-200"
               >
                  글쓰기
               </button>
            </div>
         </form>   
      </div>
   );
};

export default AddComponent;