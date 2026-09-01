import { createBrowserRouter } from "react-router";
import InfoRouter from "./infoRouter";

const root = createBrowserRouter([
    ...InfoRouter(),
]);

export default root;