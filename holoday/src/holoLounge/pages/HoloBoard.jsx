import { useSearchParams } from "react-router";
import useBoardCustomMove from "../../hooks/useBoardCustomMove";

const HoloBoard = () => {
    const [queryParams] = useSearchParams();
    const {moveToRegister} = useBoardCustomMove();

    const page = parseInt(queryParams.get("page")) || 1;
    const size = parseInt(queryParams.get("size")) || 10;

    return (
        <div>
            <div>
                홀로라운지 게시판 목록 조회 페이지 {page} - {size}
            </div>
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