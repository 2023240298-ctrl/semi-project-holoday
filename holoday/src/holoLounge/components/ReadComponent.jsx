import { useEffect, useState } from "react";
import { getOne, deleteOne, likeBoard, unLikeBoard, getCommentList, postComment, putComment, deleteComment } from "../js/HoloBoardApi";
import useBoardCustomMove from "../../hooks/useBoardCustomMove";
import "../components/ReadComponent.css"
import { Card, Badge } from "flowbite-react";

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
    size: 5,
    totalCount: 0,
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
            size: 5,
        }).then((data) => {
            console.log("댓글:", data);
            setComments(data);
        });
    }, [no]);

    return (
        <div className="readBox">

            <div className="boardArea">

                <Card className="boardDetail border border-blue-100">

                    <div className="boardMeta">
                        <span>{holoboard.categoryNo}</span>
                        <span>{holoboard.boardDate}</span>
                    </div>
                    
                    <div className="boardTitle">
                        {holoboard.boardTitle}
                    </div>

                    <div className="boardWriter">
                        작성자: {holoboard.userId}
                    </div>

                    <p className="boardContent mt-6">
                        {holoboard.boardContent}
                    </p>
                    
                    <div className="boardImage">
                        {holoboard.boardImg && (
                            <img
                                src={holoboard.boardImg}
                                alt="게시판 이미지"
                            />
                        )}
                    </div>

                    <div className="boardStats">
                        <Badge color="gray">
                            조회수 {holoboard.boardHit}
                        </Badge>
                        
                        <button
                            type="button"
                            className="rounded-lg border border-pink-300 bg-pink-50
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
                            LIKE {holoboard.boardLike}
                        </button>
                    </div>

                </Card>

                <div className="boardButtons mt-5 flex items-center justify-between">

                    <button
                        type="button"
                        className="rounded-lg border border-sky-300 bg-sky-100 px-5 py-3 text-base
                        font-semibold text-sky-700 hover:bg-sky-200"
                        onClick={moveToList}
                    >
                        목록보기
                    </button>

                    <div className="flex gap-3">

                        <button
                            type="button"
                            className="rounded-lg border border-blue-200 bg-blue-50 px-5 py-3 text-base
                            font-medium text-blue-600 hover:bg-blue-100"
                            onClick={() => moveToModify(no)}
                        >
                            수정하기
                        </button>
                
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
                    </div>
                </div>
            </div>

            <div>
                <h3>댓글</h3>

                <div>
                    <textarea
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        placeholder="댓글을 입력하세요."
                    />

                    <button
                        type="button"
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
                                        size: 5,
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
                    <div key={comment.commentNo}>

                        <div>
                            작성일: {comment.commentDate}
                        </div>
                        <div>
                            작성자: {comment.userId}
                        </div>

                        {editingCommentNo === comment.commentNo ? (
                            <div>
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
                            <div>
                                내용: {comment.commentContent}
                            </div>
                        )}

                        <div>
                            좋아요: {comment.commentLike}
                        </div>

                        {editingCommentNo !== comment.commentNo && (
                            <button
                                type="button"
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

                        <hr />

                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReadComponent;