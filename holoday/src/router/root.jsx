import memberRouter from "./memberRouter";
import { createBrowserRouter, Outlet } from "react-router";
import holoddamRouter from "./holoddamRouter";
import holoBoardRouter from "./holoBoardRouter";

const root = createBrowserRouter([
   {
      path: "/",
      children: memberRouter(),
   },
   {
      path: "/holoddam",
      HydrateFallback: () => <div>Loading...</div>,
      lazy: async () => {
         const { default: Component } = await import('../holoddam/pages/DrawPage');
         return { Component };
      },
      children: holoddamRouter(),
   },
   {
      path: "/holoboard",
      children: holoBoardRouter(),
   },
]);

export default root;