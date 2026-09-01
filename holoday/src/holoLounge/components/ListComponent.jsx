import { useEffect, useState } from "react";
import { getList } from "../js/HoloBoardApi";
import useBoardCustomMove from "../../hooks/useBoardCustomMove";
import PagiNation from "../../components/common/PagiNation";
import { useNavigate } from "react-router";

const initState = {
    dtoList: [],
    pageNumberList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    currentPage: 0,
};

const ListComponent = () => {
   const {page, size, moveToList} = useBoardCustomMove();
   const navigate = useNavigate();
   const [serverData, setServerData] = useState(initState);

   useEffect(() => {
      getList({page, size}).then((data) => {
         setServerData(data);
      });
   }, [page, size]);

   return (
      <div>
         <div>
            {serverData.dtoList.map((board) => (
               <div
                  key={board.boardNo}
                  onClick={() => navigate(`/holoboard/${board.boardNo}`)}
               >
                  <div>게시글 번호: {board.boardNo}</div>
                  <div>작성자: {board.userId}</div>
                  <div>제목: {board.boardTitle}</div>
                  <div>내용: {board.boardContent}</div>
               </div>
            ))}
         </div>

         <PagiNation serverData={serverData} movePage={moveToList} />
      </div>
   );
};

export default ListComponent;