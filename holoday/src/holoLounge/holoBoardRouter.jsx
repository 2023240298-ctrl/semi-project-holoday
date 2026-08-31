import {Navigate} from "react-router";

const holoBoardRouter = () => {
    return [
        {
            path: "holoboard",
            HydrateFallback: () => <div>불러오는 중</div>,
            lazy: async () => {
                const {default: Component} = await import("./HoloBoard")
                return {Component};
            },
        },
        {
            index: true,
            element: <Navigate to="holoboard" replace />,
        },
        {
            path: "holoboard/:no",
            HydrateFallback: () => <div>불러오는 중</div>,
            lazy: async () => {
                const {default: Component} = await import("./HoloBoardDetailPage");
                return {Component};
            },
        },
        {
            path: "holoboard/new",
            HydrateFallback: () => <div>불러오는 중</div>,
            lazy: async () => {
                const {default: Component} = await import("./HoloBoardEditPage");
                return {Component};
            },
        },
        {
            path: "holoboard/edit/:no",
            HydrateFallback: () => <div>불러오는 중</div>,
            lazy: async () => {
                const {default: Component} = await import("./HoloBoardEditPage");
                return {Component};
            },
        },
    ];
};

export default holoBoardRouter;