import {Navigate} from "react-router";

const holoLoungeRouter = () => {
    return [
        {
            path: "list",
            HydrateFallback: () => <div>목록 조회 중</div>,
            lazy: async () => {
                const {default: Component} = await import("./HoloLoungeList")
                return {Component};
            },
        },
        {
            index: true,
            element: <Navigate to="list" replace />,
        },
        {
            path: "read/:no",
            HydrateFallback: () => <div>상세 목록 조회 중</div>,
            lazy: async () => {
                const {default: Component} = await import("./HoloLoungeRead");
                return {Component};
            },
        },
    ];
};

export default holoLoungeRouter;