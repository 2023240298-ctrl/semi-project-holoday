import { useEffect, useState } from "react";
import { getList } from "../js/HoloBoardApi";
import useBoardCustomMove from "../../hooks/useBoardCustomMove";

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
   const {page, size} = useBoardCustomMove();

   const [listData, setServerData] = useState(initState);

   useEffect(() => {
      getList({page, size}).then((data) => {
         console.log(data);
         setServerData(data);
      });
   }, [page, size]);

   return (
      <div>
         {listData.dtoList.map((board) => (
            <div key={board.boardNo}>
               <div>게시글 번호: {board.boardNo}</div>
               <div>작성자: {board.userId}</div>
               <div>제목: {board.boardTitle}</div>
               <div>내용: {board.boardContent}</div>
            </div>
         ))}
      </div>
   );
};

export default ListComponent;