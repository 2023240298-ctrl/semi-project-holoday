import memberRouter from "./memberRouter";
import {createBrowserRouter} from "react-router";

const root = createBrowserRouter([
   {
      path: "/",
      children: memberRouter(),
   },
]);

export default root;