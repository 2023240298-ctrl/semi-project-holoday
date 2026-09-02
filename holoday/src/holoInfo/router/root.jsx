import { createBrowserRouter } from "react-router";
import holoInfoRouter from "./holoInfoRouter";

const root = createBrowserRouter([
    ...holoInfoRouter(),
]);

export default root;