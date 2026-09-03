import { useEffect, useState } from "react";
import { getList, deleteOne } from "../js/HoloBoardApi";
import useBoardCustomMove from "../../hooks/useBoardCustomMove";
import PagiNation from "../../components/common/PagiNation";
import { useNavigate } from "react-router";
import { Button, Card, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

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
   const [openModal, setOpenModal] = useState(false);
   const [deleteBoardNo, setDeleteBoardNo] = useState(null);
   const [openLoginModal, setOpenLoginModal] = useState(false);

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
                           onClick={() =>{
                              setDeleteBoardNo(board.boardNo);
                              setOpenModal(true);
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

            <Modal
               show={openModal}
               size="md"
               onClose={() => setOpenModal(false)}
               popup
            >
               <ModalHeader />
               <ModalBody>
                  <div className="text-center">
                     <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />

                     <h3 className="mb-5 text-lg font-normal text-gray-500">
                        게시물을 삭제하시겠습니까?
                     </h3>

                     <div className="flex justify-center gap-4">
                        <Button
                           color="red"
                           onClick={() => {
                              deleteOne(deleteBoardNo)
                                 .then(result => {
                                    console.log("삭제 완료", result);
                                    setOpenModal(false);
                                    setDeleteBoardNo(null);
                                    fetchList();
                                 })
                                 .catch(e => {
                                    console.error(e);
                                 });
                           }}
                        >
                           삭제
                        </Button>

                        <Button
                           color="gray"
                           onClick={() => setOpenModal(false)}
                        >
                           취소
                        </Button>
                     </div>
                  </div>
               </ModalBody>
            </Modal>

            <Modal
               show={openLoginModal}
               size="md"
               onClose={() => setOpenLoginModal(false)}
               popup
            >

               <ModalHeader />
               <ModalBody>
                  <div className="text-center">

                     <HiOutlineExclamationCircle
                        className="mx-auto mb-4 h-14 w-14 text-gray-400" />

                     <h3 className="mb-5 text-lg font-normal text-gray-500">
                        로그인 후 이용해 주세요.
                     </h3>
                     <div className="flex justify-center">

                        <button
                           type="button"
                           className="rounded-lg border border-yellow-100 bg-yellow-100 px-5 py-2.5
                           text-sm font-medium text-yellow-700 hover:bg-yellow-200"
                           onClick={() => setOpenLoginModal(false)}
                        >
                           확인
                        </button>
                     </div>
                  </div>
               </ModalBody>

            </Modal>

            <div className="flex justify-end">
               <button
                  type="button"
                  className="rounded-lg border border-sky-300 bg-sky-100 px-5 py-3 text-base
                  font-semibold text-sky-700 hover:bg-sky-200"
                  onClick={() => {
                     const accessToken = localStorage.getItem("accessToken");

                     if(!accessToken) {
                        setOpenLoginModal(true);
                        return;
                     }

                     navigate("/holoboard/new");
                  }}
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