import useBoardCustomMove from "../../hooks/useBoardCustomMove";
import ListComponent from "../components/ListComponent";

const HoloBoard = () => {
    const {moveToRegister} = useBoardCustomMove();

    return (
        <div>
            <div>
                홀로라운지 게시판 목록 조회 페이지
            </div>

            <ListComponent />

            <button
                type="button"
                onClick={moveToRegister}
            >
                글쓰기
            </button>
        </div>
    );
};

export default HoloBoard;