import { useEffect, useState } from "react";
import { getOne } from "../js/HoloBoardApi";

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

const ReadComponent = ({no}) => {
    const [holoboard, setHoloboard] = useState(initState);

    useEffect(() => {
        getOne(no).then((data) => {
            console.log(data);
            setHoloboard(data);
        });
    }, [no]);

    return (
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
    );
};

export default ReadComponent;