import { useSearchParams } from "react-router";

const HoloBoard = () => {
    const [queryParams] = useSearchParams();

    const page = parseInt(queryParams.get("page")) || 1;
    const size = parseInt(queryParams.get("size")) || 10;

    return (
        <div>
            홀로라운지 게시판 목록 조회 페이지 {page} - {size}
        </div>
    );
};

export default HoloBoard;