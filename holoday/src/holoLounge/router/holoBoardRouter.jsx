const holoBoardRouter = () => {
    return [
        {
            path: "holoboard",
            HydrateFallback: () => <div>목록 불러오는 중</div>,
            lazy: async () => {
                const {default: Component} = await import("../pages/HoloBoard")
                return {Component};
            },
        },
        {
            path: "holoboard/:no",
            HydrateFallback: () => <div>상세 페이지 불러오는 중</div>,
            lazy: async () => {
                const {default: Component} = await import("../pages/HoloBoardDetailPage");
                return {Component};
            },
        },
        {
            path: "holoboard/new",
            HydrateFallback: () => <div>등록 페이지 불러오는 중</div>,
            lazy: async () => {
                const {default: Component} = await import("../pages/HoloBoardNewPage");
                return {Component};
            },
        },
        {
            path: "holoboard/edit/:no",
            HydrateFallback: () => <div>수정 페이지 불러오는 중</div>,
            lazy: async () => {
                const {default: Component} = await import("../pages/HoloBoardEditPage");
                return {Component};
            },
        },
    ];
};

export default holoBoardRouter;