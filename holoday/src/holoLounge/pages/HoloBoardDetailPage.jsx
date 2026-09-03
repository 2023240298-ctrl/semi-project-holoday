import { useParams } from "react-router";
import ReadComponent from "../components/ReadComponent";
import useBoardCustomMove from "../../hooks/useBoardCustomMove";

const HoloBoardDetailPage = () => {
    const {no} = useParams();
    const {moveToBoardHome} = useBoardCustomMove();

    return (
        <div>
            <h1
                className="cursor-pointer logo-text text-blue-400 [-webkit-text-stroke:1px_#1e40af] mb-16 text-center text-3xl"
                onClick={moveToBoardHome}
            >
                Holo Lounge
            </h1>
            <ReadComponent no={no}></ReadComponent>
        </div>
    );
};

export default HoloBoardDetailPage;