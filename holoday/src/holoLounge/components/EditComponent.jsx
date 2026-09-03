import { useNavigate, useParams } from "react-router";
import { getOne, putOne, getCategoryList } from "../js/HoloBoardApi";
import { useEffect, useState } from "react";
import useBoardCustomMove from "../../hooks/useBoardCustomMove";

const initState = {
   boardNo: 0,
   categoryNo: "",
   userId: "",
   boardTitle: "",
   boardContent: "",
   boardScontent: "",
   boardDate: "",
   baordLike: 0,
   boardHit: 0,
   boardImg: "",
   boardSimg: "",
};

const EditComponent = () => {
   const {no} = useParams();
   const navigate = useNavigate();
   const [holoLounge, setHoloLounge] = useState(initState);
   const [categories, setCategories] = useState([]);
   const [file, setFile] = useState(null);
   const {moveToList} = useBoardCustomMove();

   useEffect(() => {
      getOne(no)
         .then((data) => {
         console.log("수정할 게시글:", data);
         setHoloLounge(data);
      })
      .catch(e => {
         console.error(e);
      });

      getCategoryList()
         .then((data) => {
            console.log("카테고리:", data);
            setCategories(data);
         })
         .catch((e) => {
            console.error("카테고리 조회 오류:", e);
         });
   }, [no]);

   const handleChange = (e) => {
      const {name, value} = e.target;
      
      setHoloLounge(prev => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleChangeFile = (e) => {
      setFile(e.target.files[0]);
   };

   const handleClickEdit = () => {
      putOne(holoLounge, file)
         .then((result) => {
            console.log("수정 결과:", result);
            navigate(`/holoboard/${holoLounge.boardNo}`);
         })
         .catch((e) => {
            console.error(e);
         });
   };

   return (
      <div>
         <form
            onSubmit={(e) => {
               e.preventDefault();
               handleClickEdit();
            }}>
            <div className="mx-auto w-3/4 rounded-lg border border-blue-100 bg-white p-8">
               <div className="mb-5 flex justify-end">
                  <button
                     type= "button"
                     onClick={moveToList}
                     className="holo-text border border-orange-300 px-2 py-1 text-xl text-orange-500 hover:bg-orange-50"
                  >
                     X
                  </button>
               </div>
               

               <div className="mb-5">
                  <select
                     name="categoryNo"
                     value={holoLounge.categoryNo}
                     onChange={handleChange}
                     required
                     className="holo-text w-40 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-gray-500 outline-none
                     focus:border-blue-300 focus:ring-2 focus:ring-blue-200"
                  >
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
                     />
                  </div>
               </div>
            
               <div className="mb-8">
                  <label className="head-text mb-2 block text-sm text-blue-800"
                  >
                     제목
                  </label>

                  <input
                     type="text"
                     name="boardTitle"
                     value={holoLounge.boardTitle}
                     onChange={handleChange}
                     required
                     className="holo-text w-full rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-gray-700 outline-none
                     focus:border-blue-300 focus:ring-2 focus:ring-blue-200"
                  />
               </div>

               <div className="mb-8">
                  <textarea
                     name="boardContent"
                     value={holoLounge.boardContent}
                     onChange={handleChange}
                     required
                     placeholder="내용을 입력해 주세요."
                     className="holo-text h-64 w-full resize-none rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-gray-700 outline-none
                     focus:border-blue-300 focus:ring-2 focus:ring-blue-200 placeholder:text-gray-500"
                  />
               </div>

               <div className="flex items-center gap-3">
                  <div className="flex-1 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-gray-500">
                     {file
                        ? file.name
                        : holoLounge.boardImg
                           ? "기존 이미지"
                           : "이미지"}
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
               
                  {holoLounge.boardImg && (
                     <div className="mt-4 flex justify-center">
                        <img
                           src={`http://localhost:8080/upload/${holoLounge.boardImg}`}
                           alt="기존 이미지"
                           className="h-72 w-72 rounded-lg border border-blue-100 object-cover"
                        />
                     </div>
                  )}

                  {file && (
                     <div className="mt-4 flex justify-center">
                        <img
                           src={URL.createObjectURL(file)}
                           alt="새 이미지 미리보기"
                           className="h-72 w-72 rounded-lg border border-blue-100 object-cover"
                        />
                     </div>
                  )}
            </div>

            <div className="mx-auto flex w-3/4 justify-end pt-4">
                  <button
                     type="submit"
                     className="rounded-lg border border-sky-300 bg-sky-100 px-5 py-3 text-base
                     font-semibold text-sky-700 hover:bg-sky-200"
                  >
               수정하기
            </button>
            </div>

         </form>
      </div>
   );
};

export default EditComponent;