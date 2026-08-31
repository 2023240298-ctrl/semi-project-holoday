import { createSearchParams, useNavigate, useParams, useSearchParams } from "react-router";
import ReadComponent from "../components/ReadComponent";

const HoloBoardDetailPage = () => {
    const {no} = useParams();

    console.log("상세조회 no:", no);

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
            <ReadComponent no={no}></ReadComponent>
        </div>
    );
};

export default HoloBoardDetailPage;