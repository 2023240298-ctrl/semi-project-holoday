import { useEffect, useState } from "react";
import { getOne, deleteOne, likeBoard, unLikeBoard, getCommentList, postComment, putComment, deleteComment } from "../js/HoloBoardApi";
import useBoardCustomMove from "../../hooks/useBoardCustomMove";
import "../components/ReadComponent.css"
import { Card, Badge } from "flowbite-react";
import PagiNation from "../../components/common/PagiNation";

const initState = {
    categoryNo: null,
    userId: "",
    boardTitle: "",
    boardContent: "",
    boardScontent: "",
    boardImg: "",
    boardSimg: "",
    boardDate: "",
    boardLike: 0,
    boardHit: 0,
};

const commentInitState = {
    dtoList: [],
    page: 1,
    size: 4,
    totalCount: 0,
    currentPage: 1,
    next: false,
    nextPage: 0,
    pageNumberList: [1],
    prev: false,
    prevPage: 0,
    totalPage: 1,
};

const ReadComponent = ({no}) => {
    const [holoboard, setHoloboard] = useState(initState);
    const [comments, setComments] = useState(commentInitState);
    const [editingCommentNo, setEditingCommentNo] = useState(null);
    const [editContent, setEditContent] = useState("");
    const [commentContent, setCommentContent] = useState("");
    const {moveToList, moveToModify} = useBoardCustomMove();

    useEffect(() => {
        getOne(no).then((data) => {
            console.log(data);
            setHoloboard(data);
        });
    }, [no]);

    useEffect(() => {
        getCommentList(no, {
            page: 1,
            size: 4,
        }).then((data) => {
            console.log("댓글:", data);
            setComments(data);
        });
    }, [no]);

    return (
        <div className="readBox">

            <div className="boardArea">

                <Card className="boardDetail border border-blue-100">
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="holo-text border border-orange-300 px-2 py-1 text-xl text-orange-500 hover:bg-orange-50"
                            onClick={moveToList}
                        >
                            X
                        </button>
                    </div>

                    <div className="boardMeta holo-text flex items-center justify-between text-sm text-blue-800">
                        <span>{holoboard.categoryNo}</span>
                        <span>{holoboard.boardDate}</span>
                    </div>
                    
                    <div className="boardTitle head-text mt-6 text-center text-2xl font-semibold">
                        {holoboard.boardTitle}
                    </div>

                    <div className="boardWriter holo-text flex items-center justify-between text-left">
                        <div>작성자: {holoboard.userId}</div>
                        <div className="holo-text mt-1 text-sm text-gray-500">
                            조회수 {holoboard.boardHit}
                        </div>
                    </div>
                    

                    <p className="boardContent max-h-96 min-h-56 overflow-y-auto rounded-lg 
                    bg-blue-50 px-5 py-4 leading-7 text-gray-600">
                        {holoboard.boardContent}
                    </p>
                    
                    <div className="boardImage mt-6 mb-6 flex justify-center">
                        {holoboard.boardImg && (
                            <img
                                src={holoboard.boardImg}
                                alt="게시판 이미지"
                                className="h-72 w-72 rounded-lg border border-blue-100 object-cover"
                            />
                        )}
                    </div>

                    <div className="boardStats holo-text flex justify-end">
                        <button
                            type="button"
                            className="holo-text rounded-lg border border-pink-300 bg-pink-50
                            px-3 py-1 text-sm text-pink-500"
                            onClick={() => {

                                const accessToken = localStorage.getItem("accessToken");

                                if(!accessToken) {
                                    alert("로그인 후 이용해 주세요.");
                                    return;
                                }

                                likeBoard(no)
                                    .then(() => {
                                        setHoloboard((prev) => ({
                                            ...prev,
                                            boardLike: prev.boardLike + 1
                                        }));
                                    })
                                    .catch((e) => {
                                        console.error("좋아요 오류:", e);
                                    });
                            }}
                        >
                            LIKE♡ {holoboard.boardLike}
                        </button>
                    </div>

                </Card>

                <div className="boardButtons mt-5 flex items-center justify-between">
                    <button
                        type="button"
                        className="rounded-lg border border-red-200 bg-red-50 px-5 py-3 text-base
                        font-medium text-red-500 hover:bg-red-100"
                        onClick={() => {
                            deleteOne(no)
                                .then(result => {
                                    console.log("삭제 완료:", result);
                                    moveToList();
                                })  
                                .catch(e => {
                                    console.error(e);
                                });
                        }}
                    >
                        삭제하기
                    </button>
                    
                    <button
                        type="button"
                        className="rounded-lg border border-blue-200 bg-blue-50 px-5 py-3 text-base
                        font-medium text-blue-600 hover:bg-blue-100"
                        onClick={() => moveToModify(no)}
                    >
                        수정하기
                    </button>
                </div>
            </div>

            <div className="self-start">
                <div className="rounded-lg border border-blue-100 p-5 pb-2">
                    <div>
                        <textarea
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                            className="h-24 w-full resize-none rounded-lg border border-blue-100
                            bg-blue-50 px-4 py-3 text-sm text-gray-700
                            placeholder:text-gray-400 focus:border-blue-300 focus:ring-blue-200"
                            placeholder="댓글을 입력하세요."
                        />

                        <button
                            type="button"
                            className="rounded-lg border border-blue-200 bg-blue-50
                            px-4 py-2 text-sm font-medium text-blue-600
                            hover:bg-blue-100"
                            onClick={() => {
                                const accessToken = localStorage.getItem("accessToken");

                                if(!accessToken) {
                                    alert("로그인 후 이용해 주세요.");
                                    return;
                                }

                                const content = commentContent.trim();

                                if(!content){
                                    alert("댓글 내용을 입력해 주세요.");
                                    return;
                                }

                                postComment(no, {
                                    commentContent: content
                                })
                                    .then((result) => {
                                        console.log("댓글 등록:", result);
                                        setCommentContent("");

                                        getCommentList(no, {
                                            page: 1,
                                            size: 4,
                                        }).then((data) => {
                                            setComments(data);
                                        });
                                    })
                                    .catch((e) => {
                                        console.error(e);
                                    });
                            }}
                        >
                            댓글 등록
                        </button>
                    </div>

                    {comments.dtoList.map((comment) => (
                        <div
                            key={comment.commentNo}
                            className="mt-4 rounded-lg border border-blue-100 bg-blue-50/50 p-4"
                        >

                            <div>
                    
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <span>작성자: {comment.userId}</span>
                                <span>{comment.commentDate}</span>
                            </div>

                            {editingCommentNo === comment.commentNo ? (
                                <div className="flex flex-wrap items-center gap-2">
                                    <input
                                        type="text"
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                    />

                                    <button
                                        type="button"
                                        onClick={()=>{
                                            putComment({
                                                commentNo: comment.commentNo,
                                                commentContent: editContent
                                            })
                                                .then(() => {
                                                    setComments((prev) => ({
                                                        ...prev,
                                                        dtoList: prev.dtoList.map((item) =>
                                                        item.commentNo === comment.commentNo
                                                            ? {
                                                                ...item,
                                                                commentContent: editContent
                                                            }
                                                            : item
                                                        )
                                                    }));

                                                    setEditingCommentNo(null);
                                                    setEditContent("");
                                                })
                                                .catch((e) => {
                                                    console.error(e);
                                                });
                                        }}
                                >
                                    저장하기
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditingCommentNo(null);
                                        setEditContent("");
                                    }}
                                >
                                    취소하기
                                </button>
                            </div>
                            ) : (
                                <div className="mt-3 rounded-lg bg-white px-3 py-2 text-sm leading-6
                                text-gray-600 line-clamp-3">
                                    {comment.commentContent}
                                </div>
                            )}

                            <div className="mt-2 flex items-center justify-end">
                                <div className="flex gap-1">
                                {editingCommentNo !== comment.commentNo && (
                                    <button
                                        type="button"
                                        className="holo-text rounded-lg border border-blue-200 bg-blue-50
                                        px-2 py-1 text-xs text-blue-600"
                                        onClick={() => {
                                            const accessToken = localStorage.getItem("accessToken");

                                            if(!accessToken) {
                                                alert("로그인 후 이용해 주세요.");
                                                return;
                                            }
                                            setEditingCommentNo(comment.commentNo);
                                            setEditContent(comment.commentContent);
                                        }}
                                    >
                                        수정하기
                                    </button>
                                )}

                                <button
                                    type="button"
                                    className="holo-text rounded-lg border border-red-200 bg-red-50
                                    px-2 py-1 text-xs text-red-500"
                                    onClick={() => {
                                        const accessToken = localStorage.getItem("accessToken");

                                        if(!accessToken) {
                                            alert("로그인 후 이용해 주세요.");
                                            return;
                                        }

                                        deleteComment(comment.commentNo)
                                            .then(() => {
                                                setComments((prev) => ({
                                                    ...prev,
                                                    dtoList: prev.dtoList.filter(
                                                        (item) => item.commentNo !== comment.commentNo
                                                    )
                                                }));
                                            })
                                            .catch((e) => {
                                                console.error(e);
                                            });
                                    }}
                                >
                                    삭제하기
                                </button>
                            </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-2 flex justify-center">
                    <PagiNation
                        serverData={comments}
                        movePage={({page}) => {
                            getCommentList(no, {
                                page,
                                size: 4,
                            }).then((data) => {
                                setComments(data);
                            });
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ReadComponent;