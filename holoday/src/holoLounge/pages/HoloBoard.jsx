import useBoardCustomMove from "../../hooks/useBoardCustomMove";
import ListComponent from "../components/ListComponent";
import { Card } from "flowbite-react";

const HoloBoard = () => {
    const {moveToRegister} = useBoardCustomMove();

    return (
        <div className="flex justify-center">
            <Card className="w-full max-w-6xl border-0 shadow-none">

                <h1
                    className="logo-text text-blue-400 [-webkit-text-stroke:1px_#1e40af] mb-16 text-center text-3xl"
                >
                    Holo Lounge
                </h1>
                <ListComponent />

            </Card>
        
        </div>
    );
};

export default HoloBoard;