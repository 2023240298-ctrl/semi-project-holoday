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
         <div className="w-3/4 mx-auto">
            {serverData.dtoList.map((board) => (
               <Card
                  key={board.boardNo}
                  className="mb-6 px-6 py-6"
               >

                  <div className="flex gap-6">

                     <div className="w-40 shrink-0">
                     <img
                        src={board.boardSimg}
                        alt="썸네일"
                        className="h-48 w-full object-cover"
                     />                     
                     </div>

                     <div
                        className="flex-1 cursor-pointer"
                        onClick={() =>
                           navigate(`/holoboard/${board.boardNo}`)
                        }
                     >

                        <h2 className="mb-3 text-center text-2xl font-semibold">
                           {board.boardTitle}
                        </h2>
                        <p className="mb-5 text-sm">
                           작성자 | {board.userId}
                        </p>
                        <p className="mb-8 text-lg">
                           {board.boardScontent}
                        </p>

                        <div className="flex text-sm">
                           <span>
                              작성일: {board.boardDate}
                           </span>

                           <div className="ml-auto flex gap-4">
                              <span>
                                 좋아요: {board.boardLike}
                              </span>
                              <span>
                                 조회수: {board.boardHit}
                              </span>
                           </div>
                        </div>
                     </div>
                     
                     <div className="flex w-28 flex-col items-end justify-center gap-6">
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
               </Card>
            ))}
         </div>

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