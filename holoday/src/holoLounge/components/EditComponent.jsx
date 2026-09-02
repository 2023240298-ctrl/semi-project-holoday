import { useNavigate, useParams } from "react-router";
import { getOne, putOne } from "../js/HoloBoardApi";
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
   }, [no]);

   const handleChange = (e) => {
      const {name, value} = e.target;
      
      setHoloLounge(prev => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleClickEdit = () => {
      putOne(holoLounge)
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
         <div>
            <label>제목</label>
            <input
               type="text"
               name="boardTitle"
               value={holoLounge.boardTitle}
               onChange={handleChange}
            />
         </div>

         <div>
            <label>내용</label>
            <input
               type="text"
               name="boardContent"
               value={holoLounge.boardContent}
               onChange={handleChange}
            />
         </div>

         <div>
            <label>서브내용</label>
            <input
               type="text"
               name="baordScontent"
               value={holoLounge.boardScontent}
               onChange={handleChange}
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
            onClick={handleClickEdit}
         >
            수정하기
         </button>
      </div>
   );
};

export default EditComponent;