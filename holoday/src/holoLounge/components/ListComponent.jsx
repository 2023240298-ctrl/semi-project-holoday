import { useEffect, useState } from "react";
import { getList, deleteOne } from "../js/HoloBoardApi";
import useBoardCustomMove from "../../hooks/useBoardCustomMove";
import PagiNation from "../../components/common/PagiNation";
import { useNavigate } from "react-router";
import { Card } from "flowbite-react";

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
         <div className="w-3/4 mx-auto max-md:w-full">
            {serverData.dtoList.map((board) => (
               <Card
                  key={board.boardNo}
                  className="board-card mb-16 px-6 py-6"
               >

                  <div className="flex gap-6 max-md:flex-col">

                     <div className="w-24 shrink-0 sm:w-32 md:w-40 max-md:w-full">
                        {board.boardSimg ? (
                           <img
                              src={`http://localhost:8080/upload/${board.boardSimg}`}
                              alt="썸네일"
                              className="h-56 max-md:h-48 w-full rounded-lg border border-blue-100 object-cover"
                           />
                        ) : (
                           <div className="flex h-56 max-md:h-48 w-full items-center justify-center rounded-lg border border-blue-100 
                           bg-gray-50 text-sm text-gray-400">
                              이미지 없음
                           </div>      
                        )}
                                     
                     </div>

                     <div
                        className="flex h-36 min-w-0 flex-1 cursor-pointer flex-col 
                        sm:h-44 md:h-56 max-md:h-auto max-md:w-full"
                        onClick={() =>
                           navigate(`/holoboard/${board.boardNo}`)
                        }
                     >

                        <h2 className="head-text mb-3 text-center text-2xl font-semibold">
                           {board.boardTitle}
                        </h2>
                        <p className="holo-text mb-5 text-right text-sm">
                           작성자 | {board.userId}
                        </p>
                        <div className="mt-auto min-h-32 rounded-lg border border-blue-100 
                        bg-blue-50/50 px-5 py-4">
                           <p className="holo-text line-clamp-4 text-base leading-7 text-gray-600">
                              {board.boardContent}
                           </p>
                        </div>
                     </div>

                     <div className="flex w-20 shrink-0 flex-col items-end justify-end gap-3 sm:w-24 sm:gap-4 md:w-28 md:gap-6 max-md:w-full 
                     max-md:flex-row max-md:justify-end">
                        <button
                           type="button"
                           className="rounded-lg border border-blue-200 bg-blue-50 px-5 py-3 text-base
                           font-medium text-blue-600 hover:bg-blue-100"
                           onClick={() =>
                              navigate(
                                 `/holoboard/edit/${board.boardNo}`)
                           }
                        >
                           수정하기
                        </button>

                        <button
                           type="button"
                           className="rounded-lg border border-red-200 bg-red-50 px-5 py-3 text-base
                           font-medium text-red-500 hover:bg-red-100"
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

                  <div className="holo-text mt-4 flex text-sm text-gray-500">
                     <span>
                        {board.boardDate}
                     </span>

                     <div className="holo-text ml-auto flex gap-4">
                        <span>
                           좋아요: {board.boardLike}
                        </span>
                        <span>
                           조회수: {board.boardHit}
                        </span>
                     </div>
                  </div>

               </Card>
            ))}

            <div className="flex justify-end">
               <button
                  type="button"
                  className="rounded-lg border border-sky-300 bg-sky-100 px-5 py-3 text-base
                  font-semibold text-sky-700 hover:bg-sky-200"
                  onClick={() => navigate("/holoboard/new")}
               >
                  글쓰기
               </button>
         </div>

         </div>

         <div className="flex justify-center">
            <PagiNation
               serverData={serverData}
               movePage={moveToList}
            />
         </div>
      </>
   );
};

export default ListComponent;