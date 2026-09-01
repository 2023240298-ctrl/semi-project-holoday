import { useState } from "react";
import { postAdd } from "../js/HoloBoardApi";
import { useNavigate } from "react-router";
import useBoardCustomMove from "../../hooks/useBoardCustomMove";

const initState = {
   categoryNo: "",
   boardTitle: "",
   boardContent: "",
   boardScontent: "",
   boardImg: "",
   boardSimg: "",
};

const AddComponent = () => {
   const [holoLounge, setHoloLounge] = useState(initState);
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
         <div>
            <label>카테고리</label>
            <input
               type="text"
               name="categoryNo"
               value={holoLounge.categoryNo}
               onChange={handleChangeHoloLounge}
            />
         </div>

         <div>
            <label>제목</label>
            <input
               type="text"
               name="boardTitle"
               value={holoLounge.boardTitle}
               onChange={handleChangeHoloLounge}
            />
         </div>

         <div>
            <label>내용</label>
            <input
               type="text"
               name="boardContent"
               value={holoLounge.boardContent}
               onChange={handleChangeHoloLounge}
            />
         </div>

         <div>
            <label>서브내용</label>
            <input
               type="text"
               name="boardScontent"
               value={holoLounge.boardScontent}
               onChange={handleChangeHoloLounge}
            />
         </div>

         <div>
            <label>이미지</label>
            <input
               type="text"
               name="boardImg"
               value={holoLounge.boardImg}
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