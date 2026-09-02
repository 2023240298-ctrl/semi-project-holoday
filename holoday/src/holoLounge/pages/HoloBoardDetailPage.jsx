import { useParams } from "react-router";
import ReadComponent from "../components/ReadComponent";

const HoloBoardDetailPage = () => {
    const {no} = useParams();

    return (
        <div>
            <h1 className="logo-text text-blue-400 [-webkit-text-stroke:1px_#1e40af] mb-8 text-center text-3xl">
                Holo Lounge
            </h1>
            <ReadComponent no={no}></ReadComponent>
        </div>
    );
};

export default HoloBoardDetailPage;