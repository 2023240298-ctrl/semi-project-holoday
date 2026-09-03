import memberRouter from "./memberRouter";
import { createBrowserRouter } from "react-router";
import holoddamRouter from "./holoddamRouter";
import holoBoardRouter from "./holoBoardRouter";
import holoInfoRouter from "./holoInfoRouter";
import Home from "../common/home/Home";
import App from "../App";


const root = createBrowserRouter([
   {
      path: "/",
      element: <App />,
      children: [
         {
            index: true,
            element: <Home />,
         },
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