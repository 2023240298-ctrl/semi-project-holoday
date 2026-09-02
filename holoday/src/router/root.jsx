import memberRouter from "./memberRouter";
import { createBrowserRouter, Outlet } from "react-router";
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