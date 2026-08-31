import { useParams } from "react-router";
import ReadComponent from "../components/ReadComponent";

const HoloBoardDetailPage = () => {
    const {no} = useParams();

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