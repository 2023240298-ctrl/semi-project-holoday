import useBoardCustomMove from "../../hooks/useBoardCustomMove";
import ListComponent from "../components/ListComponent";

const HoloBoard = () => {
    const {moveToRegister} = useBoardCustomMove();

    return (
        <>
            <div>
                홀로라운지 게시판 목록 조회 페이지
            </div>
            <ListComponent />
        </>
    );
};

export default HoloBoard;