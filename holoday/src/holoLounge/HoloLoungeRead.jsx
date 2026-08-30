import { useParams } from "react-router";

const HoloLoungeRead = () => {
    const {no} = useParams();

    return (
        <div>
            홀로라운지 게시판 상세 조회 페이지 {no}
        </div>
    );
};

export default HoloLoungeRead;