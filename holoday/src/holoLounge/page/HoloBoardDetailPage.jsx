import { createSearchParams, useNavigate, useParams, useSearchParams } from "react-router";
import HoloBoardOneRead from "../components/HoloBoardOneRead";

const HoloBoardDetailPage = () => {
    const {no} = useParams();
    const navigate = useNavigate();
    const [queryParams] = useSearchParams();

    const page = parseInt(queryParams.get("page")) || 1;
    const size = parseInt(queryParams.get("size")) || 10;

    const queryStr = createSearchParams({
        page: String(page),
        size: String(size),
    }).toString();

    const moveToModify = () => {
        navigate({
            pathname: `/holoboard/edit/${no}`,
            search: `?${queryStr}`,
        })
    };

    const moveToList = () => {
        navigate({
            pathname: "/holoboard",
            search: `?${queryStr}`,
        });
    };

    return (
        <div>
            <div>
                홀로라운지 게시판 상세 조회 페이지 {no}
            </div>
            <HoloBoardOneRead no={no}></HoloBoardOneRead>

            <div>
                <button
                    type="button"
                    onClick={moveToModify}
                >
                    수정하기
                </button>

                <button
                    type = "button"
                    onClick={moveToList}                
                >
                    목록
                </button>
            </div>
        </div>
    );
};

export default HoloBoardDetailPage;