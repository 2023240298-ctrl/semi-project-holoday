import useBoardCustomMove from "../hooks/useBoardCustomMove";
import EditComponent from "../components/EditComponent";

const HoloBoardEditPage = () => {
    const {moveToBoardHome} = useBoardCustomMove();

    return (
        <div>
            <h1
                className="cursor-pointer logo-text text-blue-400 [-webkit-text-stroke:1px_#1e40af] mb-16 text-center text-3xl"
                onClick={moveToBoardHome}
            >
                Holo Lounge
            </h1>
            <EditComponent />
        </div>
    );
};

export default HoloBoardEditPage;