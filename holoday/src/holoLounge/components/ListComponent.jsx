import { useEffect, useState } from "react";
import { getList, deleteOne } from "../js/HoloBoardApi";
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

   const fetchList = () => {
      getList({page, size})
         .then((data) => {
            console.log("목록 조회 성공:", data);
            setServerData(data);
         })
         .catch((error) => {
            console.log("목록 조회 실패:", error);
         });
   };

   useEffect(() => {
      fetchList();
   }, [page, size]);

   return (
      <>
         <div>
            {serverData.dtoList.map((board) => (
               <div key={board.boardNo}>

                  <div>
                     <img
                        src={board.boardSimg}
                        alt="썸네일"
                     />
                  </div>

                  <div
                     onClick={() =>
                        navigate(`/holoboard/${board.boardNo}`)
                     }
                  >
                     <div>작성자: {board.userId}</div>
                     <div>제목: {board.boardTitle}</div>
                     <div>{board.boardScontent}</div>
                     <div>작성일: {board.boardDate}</div>
                     <div>
                        좋아요: {board.boardLike}
                        {" | "}
                        조회수: {board.boardHit}
                     </div>
                  </div>

                  <div>
                     <button
                        type="button"
                        onClick={() =>
                           navigate(
                              `/holoboard/edit/${board.boardNo}`
                           )
                        }
                     >
                        수정하기
                     </button>

                     <button
                        type="button"
                        onClick={() => {
                           deleteOne(board.boardNo)
                              .then(result => {
                                 console.log("삭제 완료:", result);
                                 fetchList();
                              })
                              .catch(e => {
                                 console.error(e);
                              });
                        }}
                     >
                        삭제하기
                     </button>
                  </div>
               </div>
            ))}
         </div>

         <div>
            <button
               type="button"
               onClick={() => navigate("/holoboard/new")}
            >
               글쓰기
            </button>
         </div>

         <PagiNation
            serverData={serverData}
            movePage={moveToList}
         />
      </>
   );
};

export default ListComponent;