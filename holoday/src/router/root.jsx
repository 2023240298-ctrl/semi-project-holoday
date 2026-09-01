import memberRouter from "./memberRouter";
import { createBrowserRouter } from "react-router";
import holoddamRouter from "./holoddamRouter";

const root = createBrowserRouter([
   {
      path: "/",
      children: memberRouter(),
   },
   {
      path: "/holoddam",
      children: holoddamRouter(),
   },
]);

export default root;