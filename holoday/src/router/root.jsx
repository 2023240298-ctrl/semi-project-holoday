import memberRouter from "./memberRouter";
import { createBrowserRouter, Outlet } from "react-router";
import holoddamRouter from "./holoddamRouter";
import holoBoardRouter from "./holoBoardRouter";
import holoInfoRouter from "./holoInfoRouter";
import App from "../App";

const root = createBrowserRouter([
   {
      path: "/",
      element: <App />,
      children: [
         {
            path: "holoday",
            children: memberRouter(),
         },
         {
            path: "holoddam",
            children: holoddamRouter(),
         },
         {
            path: "holoboard",
            children: holoBoardRouter(),
         },
         {
            path: "holoinfo",
            children: holoInfoRouter(),
         },
      ]
   }
]);

export default root;