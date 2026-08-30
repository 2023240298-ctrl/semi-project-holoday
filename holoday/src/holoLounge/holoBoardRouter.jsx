import {Navigate} from "react-router";

const holoBoardRouter = () => {
    return [
        {
            path: "list",
            HydrateFallback: () => <div>불러오는 중</div>,
            lazy: async () => {
                const {default: Component} = await import("./HoloBoard")
                return {Component};
            },
        },
        {
            index: true,
            element: <Navigate to="list" replace />,
        },
        {
            path: "read/:no",
            HydrateFallback: () => <div>불러오는 중</div>,
            lazy: async () => {
                const {default: Component} = await import("./HoloBoardDetailPage");
                return {Component};
            },
        },
        {
            path: "add",
            HydrateFallback: () => <div>불러오는 중</div>,
            lazy: async () => {
                const {default: Component} = await import("./HoloBoardEditPage");
                return {Component};
            },
        },
    ];
};

export default holoBoardRouter;