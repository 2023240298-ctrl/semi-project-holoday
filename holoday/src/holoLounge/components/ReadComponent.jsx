import { useEffect, useState } from "react";
import { getOne, deleteOne, getCommentList, postComment, putComment, deleteComment } from "../js/HoloBoardApi";
import useBoardCustomMove from "../../hooks/useBoardCustomMove";
import "../components/ReadComponent.css"

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
            <div>
                <div>카테고리: {holoboard.categoryNo}</div>
                <div>작성자: {holoboard.userId}</div>
                <div>제목: {holoboard.boardTitle}</div>
                <div>내용: {holoboard.boardContent}</div>
                <div>서브내용: {holoboard.boardScontent}</div>
                <div>이미지: {holoboard.boardImg}</div>
                <div>썸네일: {holoboard.boardSimg}</div>
                <div>좋아요: {holoboard.boardLike}</div>
                <div>조회수: {holoboard.boardHit}</div>
            </div>

            <div>
                <button
                    type="button"
                    onClick={moveToList}
                >
                    목록으로
                </button>

                <button
                    type="button"
                    onClick={() => moveToModify(no)}
                >
                    수정하기
                </button>
                
                <button
                    type="button"
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
                            댓글번호: {comment.commentNo}
                        </div>
                        <div>
                            아이디: {comment.userId}
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