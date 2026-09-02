import useBoardCustomMove from "../../hooks/useBoardCustomMove";
import ListComponent from "../components/ListComponent";
import { Card } from "flowbite-react";

const HoloBoard = () => {
    const {moveToRegister} = useBoardCustomMove();

    return (
        <div className="flex jestify-center">
            <Card className="w-full max-w-6xl">

                <h1 className="mb-8 text-center text-3xl font-bold">

                    Holo Lounge

                </h1>

                <ListComponent />

            </Card>
        
        </div>
    );
};

export default HoloBoard;